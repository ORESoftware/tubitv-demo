'use strict';

import {Schema, Document, model, Model} from 'mongoose';

const s = new Schema({
  
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  
  title: {
    type: String,
    trim: true,
    required: true,
  },
  
  type: {
    type: String,
    trim: true,
    required: true,
  },
  
});

s.index({username: 1}, {unique: true, background: false});

export interface LeanUserMdl  {
  title: string,
  type: string
}

export type WatchableMdl = LeanUserMdl & Document;
export const cdtmodel = model<WatchableMdl>('Watchable', s, 'watchables');
