import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { RecipesDetailComponent } from '../recipes-detail.component';

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
  postId: string;
  createdOn: string;
  updatedOn: string;
  text: string;
  user: User;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() uuid!: string;
  comments: Comment[] = [];
  commentForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private recipeComponent: RecipesDetailComponent
  ) {
    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit() {
    if(this.recipeComponent.recipe && this.recipeComponent.recipe.comments){
      this.comments = this.recipeComponent.recipe.comments;
    }
  }


  onSubmitComment() {
    if (this.commentForm.valid) {
      const comment = {
        text: this.commentForm.get('text')?.value,
        postId: this.uuid
      };
      console.log(comment);
      this.apiService.addComment(comment).subscribe({
        next: () => {
          // this.loadComments();
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
}
