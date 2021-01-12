import * as crypto from "crypto";
import * as gravatar from "gravatar";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from "@nestjs/common";
import { IShows } from "./shows.model";
import { AppRoles } from "../app/app.roles";
import { PatchShowsPayload } from "./payload/patch.shows.payload";

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
  message: string;
}

/**
 * Shows Service
 */
@Injectable()
export class ShowsService {
  /**
   * Constructor
   * @param {Model<IShows>} showsModel
   */
  constructor(
    @InjectModel("Shows") private readonly showsModel: Model<IShows>,
  ) {}

  /**
   * Fetches a shows from database by UUID
   * @param {string} id
   * @returns {Promise<IShows>} queried shows data
   */
  get(id: string): Promise<IShows> {
    return this.showsModel.findById(id).exec();
  }

  /**
   * Fetches a shows from database by name
   * @param {string} name
   * @returns {Promise<IShows>} queried shows data
   */
  getByShowname(name: string): Promise<IShows> {
    return this.showsModel.findOne({ name }).exec();
  }

  /**
   * Fetches a shows
   * @returns {Promise<IShows>} queried shows data
   */
  getAllShows(): Promise<IShows> {
    return this.showsModel.find().exec();
  }

  /**
   * Fetches a shows
   * @returns {Promise<IShows>} queried shows data
   */
  getSearchShows(name: string): Promise<IShows> { console.log(name);
    return this.showsModel.find({ name: { $regex: name, $options: 'i' } }).exec();  
  }

  /**
   * Create a show with ShowsPayload fields
   * @param {ShowsPayload} payload profile payload
   * @returns {Promise<IShows>} created show data
   */
  async createshow(payload: PatchShowsPayload): Promise<IShows> {
 
    const createdShow = new this.showsModel({
      ...payload
    });

    return createdShow.save();
  }

   /**
   * Edit shows data
   * @param {PatchShowsPayload} payload
   * @returns {Promise<IShows>} mutated shows data
   */
  async edit(payload: PatchShowsPayload): Promise<IShows> { 
    const { name } = payload; 
    const updatedShow = await this.showsModel.updateOne(
      { name },
      payload,
    ); 
    if (updatedShow.nModified !== 1) {
      throw new BadRequestException(
        "The show with that name does not exist in the system. Please try another name.",
      );
    }
    return this.getByShowname(name);
  }

  /**
   * Delete show given a name
   * @param {string} name
   * @returns {Promise<IGenericMessageBody>} whether or not the crud operation was completed
   */
  delete(name: string): Promise<IGenericMessageBody> {
    return this.showsModel.deleteOne({ name }).then(show => {
      if (show.deletedCount === 1) {
        return { message: `Deleted ${name} from records` };
      } else {
        throw new BadRequestException(
          `Failed to delete a show by the name of ${name}.`,
        );
      }
    });
  }



}
