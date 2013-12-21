require 'spec_helper'

describe RedisService do
  it 'passses methods through to a new redis' do
    expect(described_class).to respond_to :get
  end

  it "sets a redis key when called for the first time" do
    RedisService.db.del(:testkey)
    RedisService.db.should_receive(:get).with("data")
    RedisService.set_if_expired(:testkey,80){"data"}
  end

#   it "doesn't execute the block if its already been set" do
#   end
end
