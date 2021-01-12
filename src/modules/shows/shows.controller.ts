import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  Post,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ACGuard, UseRoles } from "nest-access-control";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ShowsService, IGenericMessageBody } from "./shows.service";
import { PatchShowsPayload } from "./payload/patch.shows.payload";
import { IShows } from "./shows.model";

/**
 * Shows Controller
 */
@ApiBearerAuth()
@ApiTags("shows")
@Controller("api/shows")
export class ShowsController {
  /**
   * Constructor
   * @param showsService
   */
  constructor(private readonly showsService: ShowsService) {}

  /**
   * Retrieves shows
   * @param no param required
   * @returns {Promise<IShows>} queried shows data
   */
  @Get("listshows")
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Fetch Shows Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Shows Request Failed" })
  async getShows(): Promise<IShows> { 
    const shows = await this.showsService.getAllShows();
    if (!shows) {
      throw new BadRequestException(
        "The shows could not be found.",
      );
    }
    return shows;
  }

  /**
   * Retrieves shows
   * @param name param required
   * @returns {Promise<IShows>} queried shows data
   */
  @Get(":name")
  @UseGuards(AuthGuard("jwt"))
  @ApiResponse({ status: 200, description: "Fetch Shows Request Received" })
  @ApiResponse({ status: 400, description: "Fetch Shows Request Failed" })
  async getSearchShows(@Param("name") name: string,): Promise<IShows> { 
    const shows = await this.showsService.getSearchShows(name);
    if (!shows) {
      throw new BadRequestException(
        "The shows could not be found.",
      );
    }
    return shows;
  }




   /**
   * Create route to create show
   * @param {PatchShowsPayload} payload the registration dto
   */
  @Post("createshow")
  @ApiResponse({ status: 201, description: "Show Created" })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async createshow(@Body() payload: PatchShowsPayload): Promise<PatchShowsPayload> {
    return await this.showsService.createshow(payload);
  }


  /**
   * Edit a shows
   * @param {RegisterPayload} payload
   * @returns {Promise<IShows>} mutated shows data
   */
  @Patch(":name")
  @UseGuards(AuthGuard("jwt"))
  @UseRoles({
    resource: "shows",
    action: "update",
    possession: "any",
  })
  @ApiResponse({ status: 200, description: "Patch Shows Request Received" })
  @ApiResponse({ status: 400, description: "Patch Shows Request Failed" })
  async patchShow(@Body() payload: PatchShowsPayload) {
    return await this.showsService.edit(payload);
  }
  

  /**
   * Removes a show from the database
   * @param {string} show the name to remove
   * @returns {Promise<IGenericMessageBody>} whether or not the show has been deleted
   */
  @Delete(":name")
  @UseGuards(AuthGuard("jwt"), ACGuard)
  @UseRoles({
    resource: "shows",
    action: "delete",
    possession: "any",
  })
  @ApiResponse({ status: 200, description: "Delete Show Request Received" })
  @ApiResponse({ status: 400, description: "Delete Show Request Failed" })
  async delete(
    @Param("name") name: string,
  ): Promise<IGenericMessageBody> {
    return await this.showsService.delete(name);
  }
}
