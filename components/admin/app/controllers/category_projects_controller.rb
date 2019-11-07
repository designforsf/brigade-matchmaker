class CategoryProjectsController < ApplicationController
  before_action :set_project
  before_action :set_category_project, only: %i[show edit update destroy]

  # GET /category_projects
  # GET /category_projects.json
  def index
    @category_projects = CategoryProject.all
  end

  # GET /category_projects/1
  # GET /category_projects/1.json
  def show
  end

  # GET /category_projects/new
  def new
    @category_project = CategoryProject.new
  end

  # GET /category_projects/1/edit
  def edit
  end

  # POST /category_projects
  # POST /category_projects.json
  def create
    @category_project = CategoryProject.new(category_project_params)

    respond_to do |format|
      if @category_project.save
        format.html { redirect_to @category_project, notice: 'Category project was successfully created.' }
        format.json { render :show, status: :created, location: @category_project }
      else
        format.html { render :new }
        format.json { render json: @category_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /category_projects/1
  # PATCH/PUT /category_projects/1.json
  def update
    respond_to do |format|
      if @category_project.update(category_project_params)
        format.html { redirect_to @category_project, notice: 'Category project was successfully updated.' }
        format.json { render :show, status: :ok, location: @category_project }
      else
        format.html { render :edit }
        format.json { render json: @category_project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /category_projects/1
  # DELETE /category_projects/1.json
  def destroy
    @category_project.destroy
    respond_to do |format|
      format.html { redirect_to category_projects_url, notice: 'Category project was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_category_project
    @category_project = @project.category_projects.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def category_project_params
    params.fetch(:category_project, {})
  end
end
