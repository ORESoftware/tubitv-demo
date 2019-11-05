'use strict';

import {Schema, Document, model, Model} from 'mongoose';

const s = new Schema({
  
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  }
  
});

s.index({username: 1}, {unique: true, background: false});
s.index({email: 1}, {unique: true, background: false});

export interface LeanUserMdl  {
  username: string
}

export type UserMdl = LeanUserMdl & Document;
export const cdtmodel = model<UserMdl>('User', s, 'users');
