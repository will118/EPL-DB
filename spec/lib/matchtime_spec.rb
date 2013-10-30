require 'spec_helper'

describe MatchTime do
	  it "has a valid factory" do
	  	expect(create(:fixture)).to be_valid
		end

		it "initializes @timeuntil" do
			fixture = FactoryGirl.build(:fixture)
			match_timer = MatchTime.new(fixture.kickoff)
			# 5 seconds because whole test suite takes a while
			expect(match_timer.time_until).to be_within(5).of(0)
		end

		it "should be half time" do
			fixture = FactoryGirl.build(:fixture, kickoff: Time.now.utc - 50.minutes)
			match_timer = MatchTime.new(fixture.kickoff)
			expect(match_timer.halftime?).to be(true)
		end

		it "should be prematch" do
			fixture = FactoryGirl.build(:fixture, kickoff: Time.now.utc - 30.minutes)
			match_timer = MatchTime.new(fixture.kickoff)
			expect(match_timer.pre_match?).to be(true)
		end

		it "should say the match is over" do
			fixture = FactoryGirl.build(:fixture, kickoff: Time.now.utc - 120.minutes)
			match_timer = MatchTime.new(fixture.kickoff)
			expect(match_timer.match_over?).to be(true)
		end

		it "should say any match under 3 minutes away is on" do
			truefixtures = [FactoryGirl.build(:fixture, kickoff: Time.now.utc + 2.minutes), FactoryGirl.build(:fixture, kickoff: Time.now.utc - 10.minutes), FactoryGirl.build(:fixture, kickoff: Time.now.utc - 20.minutes), FactoryGirl.build(:fixture, kickoff: Time.now.utc - 130.minutes)]

			truefixtures.each do |x| 
				match_timer = MatchTime.new(x.kickoff)
				expect(match_timer.live_match?).to be(true)
			end

			falsefix = FactoryGirl.build(:fixture, kickoff: Time.now.utc + 4.minutes)
			match_timer = MatchTime.new(falsefix.kickoff)
			expect(match_timer.live_match?).to be(false)
		end

		it "should say there is a match soon if under half an hour" do 
			fixture = FactoryGirl.build(:fixture, kickoff: Time.now.utc + 25.minutes)
			match_timer = MatchTime.new(fixture.kickoff)
			expect(match_timer.pre_match?).to be(true)
		end


		it "should say if a match has just ended or there is one soon" do
			truefix = [FactoryGirl.build(:fixture, kickoff: Time.now.utc + 65.minutes),FactoryGirl.build(:fixture, kickoff: Time.now.utc - 125.minutes)]

			truefix.each do |x| 
				timer = MatchTime.new(x.kickoff)
				expect(timer.match_on_soon_or_just_ended?).to be(true)
			end
			
			fix3 = FactoryGirl.build(:fixture, kickoff: Time.now.utc - 60.minutes)
			match3_timer = MatchTime.new(fix3.kickoff)
			expect(match3_timer.match_on_soon_or_just_ended?).to be(false)
		end



end
