import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Account, AccountSchema, UserRole, UserStatus } from '.';

export const USER_MODEL = 'User';
export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop()
  phone: string;

  @Prop({ default: false })
  isPhoneVerified: boolean;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: [AccountSchema], default: [] })
  accounts: Account[];

  @Prop()
  avatar: string;

  @Prop()
  cover: string;

  @Prop({ default: UserRole.USER })
  role: UserRole;

  @Prop({ default: UserStatus.ACTIVE })
  status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
