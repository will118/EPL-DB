class Megamodel < ActiveRecord::Base

  def self.export_json_to_path(path)
    Dir.chdir path
    mm = Megamodel.all
    IO.write("ht_data.json", mm.to_json)
  end

end
