class BetsController < ApplicationController
  before_action :set_bet, only: [:show, :edit, :update, :destroy]

JASON = [{"key"=>"Accuracy", "values"=>[{"x"=>1, "y"=>1}, {"x"=>2, "y"=>2}, {"x"=>3, "y"=>3}, {"x"=>4, "y"=>4}, {"x"=>5, "y"=>5}, {"x"=>6, "y"=>6}, {"x"=>7, "y"=>7}, {"x"=>8, "y"=>8}, {"x"=>9, "y"=>9}, {"x"=>10, "y"=>10}]}, {"key"=>"Possession", "values"=>[{"x"=>1, "y"=>2}, {"x"=>2, "y"=>4}, {"x"=>3, "y"=>6}, {"x"=>4, "y"=>7}, {"x"=>5, "y"=>8}, {"x"=>6, "y"=>9}, {"x"=>7, "y"=>7}, {"x"=>8, "y"=>10}, {"x"=>9, "y"=>11}, {"x"=>10, "y"=>14}]}, {"key"=>"Duels Won", "values"=>[{"x"=>1, "y"=>6}, {"x"=>2, "y"=>4}, {"x"=>3, "y"=>6}, {"x"=>4, "y"=>7}, {"x"=>5, "y"=>18}, {"x"=>6, "y"=>9}, {"x"=>7, "y"=>17}, {"x"=>8, "y"=>10}, {"x"=>9, "y"=>14}, {"x"=>10, "y"=>5}]}]
  # GET /bets
  # GET /bets.json
  def index
    @bets = Bet.all 
    @possession = Possession.all
    @passing = Passing.all
    gon.bets = Bet.first(4)
    gon.d3 = JASON
  end

  # GET /bets/1
  # GET /bets/1.json
  def show
  end

  # GET /bets/new
  def new
    @bet = Bet.new
  end


  # GET /bets/1/edit
  def edit
  end

  # POST /bets
  # POST /bets.json
  def create
    @bet = Bet.new(bet_params)

    respond_to do |format|
      if @bet.save
        format.html { redirect_to @bet, notice: 'Bet was successfully created.' }
        format.json { render action: 'show', status: :created, location: @bet }
      else
        format.html { render action: 'new' }
        format.json { render json: @bet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bets/1
  # PATCH/PUT /bets/1.json
  def update
    respond_to do |format|
      if @bet.update(bet_params)
        format.html { redirect_to @bet, notice: 'Bet was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @bet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bets/1
  # DELETE /bets/1.json
  def destroy
    @bet.destroy
    respond_to do |format|
      format.html { redirect_to bets_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bet
      @bet = Bet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bet_params
      params.require(:bet).permit(:homescore, :awayscore, :homeodds, :awayodds)
    end
end
