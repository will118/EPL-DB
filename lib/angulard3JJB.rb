# class JJB

	# def jason



		
class JB
def self.vrr
	
		avg_poss = [352, 392, 213, 476, 362, 262, 383]
		shot_acc = [352, 392, 213, 476, 362, 262, 383]
		pass_acc = [352, 392, 213, 476, 362, 262, 383]
		att_score = [352, 392, 213, 476, 362, 262, 383]
		def_score = [352, 392, 213, 476, 362, 262, 383]
		poss_score = [352, 392, 213, 476, 362, 262, 383]
		opta_score = [352, 392, 213, 476, 362, 262, 383]
		
		length_of_models = shot_acc.length

		matchnumber = * 1..length_of_models
[matchnumber, pass_acc, shot_acc, def_score, att_score, poss_score, opta_score, avg_poss].transpose.map do |x, y, z, d, a, p, o, v| 
	{ 'x'=> x, "pass_acc"=> y, "shot_acc"=> z, "def_score"=> d, "att_score"=> a, "poss_score"=> p, "opta_score"=> o, "avg_poss"=> v}
end


end 
end

p JB.vrr