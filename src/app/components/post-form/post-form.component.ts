import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.models';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit{
  postToAdd!        :Post;
  postList!         :Post[];
  userIdList        :number[]=[];
  titleLength       :number=0;
  bodyLength        :number=0;

  addPostFormGroup! :FormGroup;


  constructor(private postService:PostService,private formBuilder:FormBuilder){
    
  }


  async ngOnInit(): Promise<void> {
    
    this.postService.getPostList().subscribe((postList:any)=>{
      postList.map((auxPost:Post)=>{
          let post={
            userId: auxPost.userId
          }
          this.userIdList.push(post.userId);
          this.userIdList = [...new Set(this.userIdList)];
      })
    });
    
    this.addPostFormGroup=this.formBuilder.group({
      postToAddUserId  : ['',[Validators.required]],
      postToAddTitle   : ['',[Validators.required,Validators.maxLength(80),Validators.pattern(/[\S]/)]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      postToAddBody    : ['',[Validators.required,Validators.maxLength(500),Validators.pattern(/[\S]/)]]
    });
 
  }


//
  refreshLength(){
    this.titleLength=this.addPostFormGroup.get('postToAddTitle')?.value?.length ?? 0;
    this.bodyLength=this.addPostFormGroup.get('postToAddBody')?.value?.length ?? 0;
  }
//
get invalidPostToAddUserId(){
  return !this.addPostFormGroup.get('postToAddUserId')?.dirty;
}

  get invalidPostToAddTitle(){
    return this.addPostFormGroup.get('postToAddTitle')?.invalid;
  }

  get invalidPostToAddBody(){
    return this.addPostFormGroup.get('postToAddBody')?.invalid;
  }

  saveAddPost(){
    let post:Post=new Post(
      this.addPostFormGroup.get('postToAddUserId')?.value,
      '',
      this.addPostFormGroup.get('postToAddTitle')?.value,
      this.addPostFormGroup.get('postToAddBody')?.value
    );
    
    this.postService.addPost(post);
  }
}
