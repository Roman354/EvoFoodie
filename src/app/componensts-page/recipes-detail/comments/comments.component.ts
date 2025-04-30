import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { RecipesDetailComponent } from '../recipes-detail.component';
import { Store } from '@ngxs/store';

interface User {
  avatar: string;
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
}

interface Comment {
  id: string;
  createdOn: string;
  updatedOn: string;
  text: string;
  user: User;
  postId: string;
}

interface Recipe {
  id: string;
  comments: Comment[];
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  uuid!: string;
  comments: any[] = [];
  commentForm: FormGroup;
  isAuthenticated = false;


  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private recipeComponent: RecipesDetailComponent,
    private store: Store
  ) {
    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit() {
    if(this.recipeComponent.recipe && this.recipeComponent.recipe.comments){
      this.comments = this.recipeComponent.recipe.comments;
    }
    this.uuid = this.recipeComponent.recipe.id;
    this.store.select(state => state.auth.user).subscribe(user => {
      this.isAuthenticated = !!user;

    });
  }

  onSubmitComment() {
    if (this.commentForm.valid && this.isAuthenticated) {
      const comment = {
        text: this.commentForm.get('text')?.value,
        postId: this.uuid
      };
      this.apiService.addComment(comment).subscribe({
        next: () => {
          this.loadComments();
          this.commentForm.reset();
        },
        error: (error) => {
          console.error('Error adding comment:', error);
        }
      });
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  loadComments() {
    this.apiService.getOneRecipe(this.uuid).subscribe({
      next: (result: any) => {
        if(result && result.comments){
          this.comments = result.comments;
        }
      }
    });
  }
}
