class PostsController < ApplicationController
  def index  
	@posts = Post.all(:order => "created_at DESC")
    respond_to do |format|  
      format.html  
    end  
  end  
  
  def create  
    @post = Post.create(:message => params[:message], :user_id => current_user.id)  
    respond_to do |format|  
      if @post.save  
        format.json { render :json => @post, :include => { :user => { :only => [:username] } } }
      else  
        flash[:notice] = "Message failed to save."  
        format.html { redirect_to posts_path }  
      end  
    end  
  end
  
  def show  
	@id_user = User.find_by_username(params[:id])
	@posts = Post.all(:conditions => { :user_id => @id_user }, :order => "created_at DESC")
	@username = @posts.first().user.username
    respond_to do |format|  
      format.html  
    end  
  end  
end
