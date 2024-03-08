import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { CategoryModule } from './internal/category/category.module';
import { PostModule } from './internal/post/post.module';
import { RoleModule } from './internal/role/role.module';
import { AuthModule } from './internal/auth/auth.module';
import { ProfileModule } from './internal/profile/profile.module';
import { CommentModule } from './internal/comment/comment.module';
import { ReportModule } from './internal/report/report.module';
import { HashtagModule } from './internal/hashtag/hashtag.module';
import { StorageModule } from './internal/storage/storage.module';
import { AppController } from './app.controller';
import { CategoryController } from './internal/category/delivery/category.controller';
import { ProfileController } from './internal/profile/delivery/profile.controller';
import { ReportController } from './internal/report/report.controller';
import { CommentController } from './internal/comment/delivery/comment.controller';
import { AuthController } from './internal/auth/delivery/auth.controller';
import { HttpController } from './internal/post/delivery/http.controller';
import { StorageController } from './internal/storage/storage.controller';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    PostModule,
    ProfileModule,
    CommentModule,
    ReportModule,
    RoleModule,
    HashtagModule,
    StorageModule,
  ],
  controllers: [
    AppController,
    CategoryController,
    ProfileController,
    ReportController,
    CommentController,
    AuthController,
    HttpController,
    StorageController,
  ],

  providers: [AppService],
})
export class AppModule { }
