import { Inject, Injectable } from '@nestjs/common';
import { Comment, CommentInterop, CommentUseCase } from '../../../../domain/comment.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';

@Injectable()
export class CommentInteropBaseService implements CommentInterop {

    constructor(@Inject('CommentUseCase') private useCase: CommentUseCase, @Inject('AuthUseCase') private auth: AuthUseCase) {}
    async createComment(token: string,comment: Comment) {
        try {
          let decoded = await this.auth.verifyToken(token);
          comment.authorId = decoded.uid;
          return await this.useCase.createComment(comment);
        }catch (e) {
            throw e;
        }
    }
    async updateComment(token: string,comment: Comment) {
      try {
        return this.useCase.updateComment(comment);
      }
      catch (e) {
        throw e;
      }
    }
    async deleteComment(token: string,id: string) {
      try {
        return await this.useCase.deleteComment(id);
      }
      catch (e) {
        throw e;
      }
    }
    async getCommentById(token: string,id: string): Promise<Comment> {
      try {
        return await this.useCase.getCommentById(id);

      }
      catch (e) {
          throw e;
      }
    }
    async getComments(token: string): Promise<Comment[]> {
      try {
        return await this.useCase.getComments();
      }
      catch (e) {
          throw e;
      }
    }
}
