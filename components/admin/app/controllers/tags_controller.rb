class TagsController < ApplicationController
  before_action :set_category
  before_action :set_tag, only: [:show, :edit, :update, :destroy]

  # GET /category/:category_id/tags
  # GET /category/:category_id/tags.json
  def index
    @tags = @category.tags
  end

  # GET /category/:category_id/tags/1
  # GET /category/:category_id/tags/1.json
  def show
  end

  # GET /category/:category_id/tags/new
  def new
    @tag = @category.tags.new
  end

  # GET /category/:category_id/tags/1/edit
  def edit
  end

  # POST /category/:category_id/tags
  # POST /category/:category_id/tags.json
  def create
    @tag = @category.tags.new(tag_params)

    respond_to do |format|
      if @tag.save
        format.html { redirect_to @category, notice: 'Tag was successfully created.' }
        format.json { render :show, status: :created, location: @category }
      else
        format.html { render :new }
        format.json { render json: @tag.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /category/:category_id/tags/1
  # PATCH/PUT /category/:category_id/tags/1.json
  def update
    respond_to do |format|
      if @tag.update(tag_params)
        format.html { redirect_to [@category, @tag], notice: 'Tag was successfully updated.' }
        format.json { render :show, status: :ok, location: [@category, @tag] }
      else
        format.html { render :edit }
        format.json { render json: @tag.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /category/:category_id/tags/1
  # DELETE /category/:category_id/tags/1.json
  def destroy
    @tag.destroy
    respond_to do |format|
      format.html { redirect_to @category, notice: 'Tag was successfully destroyed.' }
      format.json { head :no_content }
      format.js { render :delete }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:category_id])
  end

  def set_tag
    @tag = @category.tags.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def tag_params
    params.require(:tag).permit(:name)
  end
end
