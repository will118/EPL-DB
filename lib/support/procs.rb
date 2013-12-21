def downcase_hyphenate(location)
  if location == "away"
    return Proc.new {|x| x.downcase.gsub(" ", "-") + "-away"}
  else
    return Proc.new {|x| x.downcase.gsub(" ", "-") }
  end
end

def percentage_calc(home, away)
    total = home + away
    return Proc.new {|x| (x.to_f/total.to_f)*100 }
end

