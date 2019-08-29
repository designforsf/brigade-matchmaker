class CategoryTaxonomiesController < ApplicationController
  before_action :set_category_taxonomy, only: [:show, :edit, :update, :destroy]

  # GET /category_taxonomies
  # GET /category_taxonomies.json
  def index
    @category_taxonomies = CategoryTaxonomy.all
  end

  # GET /category_taxonomies/1
  # GET /category_taxonomies/1.json
  def show
  end

  # GET /category_taxonomies/new
  def new
    @category_taxonomy = CategoryTaxonomy.new
  end

  # GET /category_taxonomies/1/edit
  def edit
  end

  # POST /category_taxonomies
  # POST /category_taxonomies.json
  def create
    @category_taxonomy = CategoryTaxonomy.new(category_taxonomy_params)

    respond_to do |format|
      if @category_taxonomy.save
        format.html { redirect_to @category_taxonomy, notice: 'Category taxonomy was successfully created.' }
        format.json { render :show, status: :created, location: @category_taxonomy }
      else
        format.html { render :new }
        format.json { render json: @category_taxonomy.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /category_taxonomies/1
  # PATCH/PUT /category_taxonomies/1.json
  def update
    respond_to do |format|
      if @category_taxonomy.update(category_taxonomy_params)
        format.html { redirect_to @category_taxonomy, notice: 'Category taxonomy was successfully updated.' }
        format.json { render :show, status: :ok, location: @category_taxonomy }
      else
        format.html { render :edit }
        format.json { render json: @category_taxonomy.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /category_taxonomies/1
  # DELETE /category_taxonomies/1.json
  def destroy
    @category_taxonomy.destroy
    respond_to do |format|
      format.html { redirect_to category_taxonomies_url, notice: 'Category taxonomy was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category_taxonomy
      @category_taxonomy = CategoryTaxonomy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def category_taxonomy_params
      params.require(:category_taxonomy).permit(:category_id, :taxonomy_id)
    end
end
