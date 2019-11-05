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
  },
  
  hasAccess: {
    type: Boolean,
    default: true,
  },
  
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  
  isSeedData: {
    type: Boolean,
    default: false,
  },
  
  jobTitle: {
    type: String,
    required: false
  },
  
  email: {
    type: String,
    // note: cannot be unique because it is not currently required
    required: true
  },
  
  lastLogin: {
    type: Date,
    default: new Date()
  },
  
  acqId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Acquisition'
  },
  
  roles: [{
    type: String,
    trim: true,
    required: true,
  }]
  
});

s.index({username: 1}, {unique: true, background: false});
s.index({email: 1}, {unique: true, background: false});

export interface LeanUserMdl  {
  hasAccess: boolean,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  jobTitle?: string,
  roles: Array<string>,
  acqId?: Schema.Types.ObjectId,
  lastLogin?: Date
}

export type UserMdl = LeanUserMdl & Document;
export const cdtmodel = model<UserMdl>('User', s, 'users');
