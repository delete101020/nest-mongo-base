import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountType } from '.';

export const ACCOUNT_MODEL = 'Account';
export type AccountDocument = Account & Document;

@Schema({ _id: false, timestamps: false })
export class Account {
  @Prop({ default: AccountType.INTERNAL })
  type: AccountType;

  // Unique id for each account type, e.g. facebook id, google id, etc.
  // If type is internal, this field is the same as username.
  @Prop()
  uid: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
