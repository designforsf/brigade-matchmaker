class CategoryTagsController < ApplicationController
  before_action :set_category_tag, only: [:show, :edit, :update, :destroy]

  # GET /category_tags
  # GET /category_tags.json
  def index
    @category_tags = CategoryTag.all
  end

  # GET /category_tags/1
  # GET /category_tags/1.json
  def show
  end

  # GET /category_tags/new
  def new
    @category_tag = CategoryTag.new
  end

  # GET /category_tags/1/edit
  def edit
  end

  # POST /category_tags
  # POST /category_tags.json
  def create
    @category_tag = CategoryTag.new(category_tag_params)

    respond_to do |format|
      if @category_tag.save
        format.html { redirect_to @category_tag, notice: 'Category tag was successfully created.' }
        format.json { render :show, status: :created, location: @category_tag }
      else
        format.html { render :new }
        format.json { render json: @category_tag.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /category_tags/1
  # PATCH/PUT /category_tags/1.json
  def update
    respond_to do |format|
      if @category_tag.update(category_tag_params)
        format.html { redirect_to @category_tag, notice: 'Category tag was successfully updated.' }
        format.json { render :show, status: :ok, location: @category_tag }
      else
        format.html { render :edit }
        format.json { render json: @category_tag.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /category_tags/1
  # DELETE /category_tags/1.json
  def destroy
    @category_tag.destroy
    respond_to do |format|
      format.html { redirect_to category_tags_url, notice: 'Category tag was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category_tag
      @category_tag = CategoryTag.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def category_tag_params
      params.require(:category_tag).permit(:category_id, :tag_id)
    end
end
