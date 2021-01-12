import { Schema, Document } from "mongoose";
import { AppRoles } from "modules/app/app.roles";

/**
 * Mongoose Shows Schema
 */
export const Shows = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Mongoose Shows Document
 */
export interface IShows extends Document {
  /**
   * UUID
   */
  readonly _id: Schema.Types.ObjectId;
  /**
   * Name
   */
  readonly name: string;
  /**
   * image
   */
  readonly image: string;
  /**
   * Type
   */
  readonly type: string;
  /**
   * Date
   */
  readonly date: Date;
}
