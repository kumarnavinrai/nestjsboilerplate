import { Module } from "@nestjs/common";
import { ShowsService } from "./shows.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Shows } from "./shows.model";
import { ShowsController } from "./shows.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Shows", schema: Shows }])],
  providers: [ShowsService],
  exports: [ShowsService],
  controllers: [ShowsController],
})
export class ShowsModule {}
