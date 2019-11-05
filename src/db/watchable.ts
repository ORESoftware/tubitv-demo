'use strict';

import {Schema, Document, model, Model} from 'mongoose';

const s = new Schema({
  
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  
  type: {
    type: String,
    trim: true,
    required: true,
  },
  
});

s.index({username: 1}, {unique: true, background: false});
s.index({email: 1}, {unique: true, background: false});

export interface LeanUserMdl  {
  username: string
}

export type WatchableMdl = LeanUserMdl & Document;
export const cdtmodel = model<WatchableMdl>('Watchable', s, 'watchables');
