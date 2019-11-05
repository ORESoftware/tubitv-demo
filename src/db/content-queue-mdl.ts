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
  
  watchableId: {
    type: Schema.Types.ObjectId,
    required: true,
  }
  
});

s.index({username: 1}, {unique: false, background: false});
s.index({watchableId: 1}, {unique: false, background: false});

export interface LeanUserMdl {
  username: string,
  watchableId: string
}

export type ContentQueueMdl = LeanUserMdl & Document;
export const cdtmodel = model<ContentQueueMdl>('ContentQueue', s, 'contentqueue');
