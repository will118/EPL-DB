class HomeXisController < ApplicationController
  before_action :set_home_xi, only: [:show, :edit, :update, :destroy]

  # GET /home_xis
  # GET /home_xis.json
  def index
    @home_xis = HomeXi.all
    @away_xis = AwayXi.all
  end

  def populate
    system "rake populater:hometeam &"
    sleep 2
    redirect_to home_xis_url 
  end
  # GET /home_xis/1
  # GET /home_xis/1.json
  def show
  end

  # GET /home_xis/new
  def new
    @home_xi = HomeXi.new
  end

  # GET /home_xis/1/edit
  def edit
  end

  # POST /home_xis
  # POST /home_xis.json
  def create
    @home_xi = HomeXi.new(home_xi_params)

    respond_to do |format|
      if @home_xi.save
        format.html { redirect_to @home_xi, notice: 'Home xi was successfully created.' }
        format.json { render action: 'show', status: :created, location: @home_xi }
      else
        format.html { render action: 'new' }
        format.json { render json: @home_xi.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /home_xis/1
  # PATCH/PUT /home_xis/1.json
  def update
    respond_to do |format|
      if @home_xi.update(home_xi_params)
        format.html { redirect_to @home_xi, notice: 'Home xi was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @home_xi.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /home_xis/1
  # DELETE /home_xis/1.json
  def destroy
    @home_xi.destroy
    respond_to do |format|
      format.html { redirect_to home_xis_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_home_xi
      @home_xi = HomeXi.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def home_xi_params
      params.require(:home_xi).permit(:name, :number, :subbed)
    end
end
