module ARBuilder

	def form_get
		form = JasonTheBuilder.single_form
    form.each do |d|
      form = d["form"].join(' ')
      fo = Form.where(:team => d["team"]).first_or_create
      fo.form = form
      fo.save
    end

  end
end
