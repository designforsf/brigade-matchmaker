class ProjectTagsController < ApplicationController
  before_action :set_project
  before_action :set_project_tag, only: :destroy

  # GET /project_tags
  # GET /project_tags.json
  def index
    @project_tags = ProjectTag.all
  end

  # POST /project_tags
  # POST /project_tags.json
  def create
    @project_tag = @project.project_tags.new(project_tag_params)

    respond_to do |format|
      if @project_tag.save
        format.json { render :show, status: :created }
        format.js
      else
        format.json { render json: @project_tag.errors, status: :unprocessable_entity }
        format.js
      end
    end
  end

  # DELETE /project_tags/1
  # DELETE /project_tags/1.json
  def destroy
    @project_tag.destroy
    respond_to do |format|
      format.html { redirect_to project_project_tags_url(@project), notice: 'Project tag was successfully destroyed.' }
      format.json { head :no_content }
      format.js
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_project_tag
    @project_tag = @project.project_tags.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def project_tag_params
    params.require(:project_tag).permit(:tag_id, :taxonomy_id)
  end
end
