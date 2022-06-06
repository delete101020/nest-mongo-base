import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, SignOptions } from 'jsonwebtoken';
import { genSalt, compare, hash } from 'bcryptjs';
import { ConfigVar } from '../shared/config/config.enum';
import { Account, AccountType, User, UserDocument } from '../user/models';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos';

export const ACCESS_TOKEN = 'access';
export const REFRESH_TOKEN = 'refresh';

@Injectable()
export class AuthService {
  private readonly jwtOptions: {
    [ACCESS_TOKEN]: SignOptions;
    [REFRESH_TOKEN]: SignOptions;
  };
  private readonly jwtKeys: {
    [ACCESS_TOKEN]: string;
    [REFRESH_TOKEN]: string;
  };

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.jwtKeys = {
      [ACCESS_TOKEN]: this.configService.get(ConfigVar.JWT_SECRET),
      [REFRESH_TOKEN]: this.configService.get(ConfigVar.JWT_REFRESH_SECRET),
    };
    this.jwtOptions = {
      [ACCESS_TOKEN]: {
        expiresIn: this.configService.get(ConfigVar.JWT_EXPIRES_IN),
      },
      [REFRESH_TOKEN]: {
        expiresIn: this.configService.get(ConfigVar.JWT_REFRESH_EXPIRES_IN),
      },
    };
  }

  async register(registerParams: RegisterDto) {
    const { email, phone, password, firstName, lastName } = registerParams;

    // Check if email or phone already exists
    const checkCondition = [];
    if (email) checkCondition.push({ email });
    if (phone) checkCondition.push({ phone });
    const users = await this.userService.getAll({ $or: checkCondition });
    if (users.length)
      throw new BadRequestException('Email or phone already exists');

    const newUser = new User() as UserDocument;
    newUser.email = email;
    newUser.phone = phone;
    newUser.firstName = firstName;
    newUser.lastName = lastName;

    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);

    const account = new Account();
    account.type = AccountType.INTERNAL;
    account.uid = `user_${new Date().getTime()}`;
    newUser.accounts = [account];

    try {
      const user = await this.userService.create(newUser);
      return this.userService.getById(user._id);
    } catch (error) {
      throw error;
    }
  }

  async login(user: User) {
    const { _id, email, phone, firstName, lastName, role, status } = user;

    const payload = {
      _id,
      email,
      phone,
      firstName,
      lastName,
      role,
      status,
    };

    const accessToken = await this.signPayload(payload, ACCESS_TOKEN);
    const refreshToken = await this.signPayload(payload, REFRESH_TOKEN);

    return { accessToken, refreshToken };
  }

  async validateUser(identifier: string, password: string) {
    const users = await this.userService.getAll({
      $or: [
        { email: identifier },
        { phone: identifier },
        { 'accounts.uid': identifier, 'accounts.type': AccountType.INTERNAL },
      ],
    });
    console.log(users);
    if (!users.length) return null;

    const user = users[0];
    if (await this.comparePassword(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async signPayload(
    payload: any,
    type: string = ACCESS_TOKEN || REFRESH_TOKEN,
  ) {
    return sign(payload, this.jwtKeys[type], this.jwtOptions[type]);
  }

  async comparePassword(password: string, input: string) {
    return compare(password, input);
  }
}
