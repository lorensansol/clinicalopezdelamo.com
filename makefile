
# jekyll and npm install from root directory
install:
	gem install bundler ;\
	bundle install ;\
	npm install

# jekyll local development build
build:
	echo "baseurl: 'file://${PWD}/_site'" | perl -pe "s/applications/Applications/gm" > _config_tmpdev.yml ;\
	bundle exec jekyll build --config _config.yml,_config_dev.yml,_config_tmpdev.yml ;\
	rm _config_tmpdev.yml

# jekyll local development server start
server:
	bundle exec jekyll serve --watch --config _config.yml,_config_dev.yml

# jekyll local production server start
server-production:
	JEKYLL_ENV=production bundle exec jekyll serve --watch

# upload with date now
up:
	git add . ;\
	git commit -m "Update: `date +\'%Y-%m-%d %H:%M:%S\'`" ;\
	git push

# on server runing, create production resources and upload
deploy:
	make fa-min ;\
	gulp jcc ;\
	make up

# build and up
bauildandup:
	gulp html ;\
	make build ;\
	make fa-min ;\
	make build ;\
	gulp jcc ;\
	make up

#	create an optimal used-icons.json with all the fontawesome used icons
#		used fa icons
#			fin all html files
#			xargs: in each
#			grep: get fa icons by regex
#			sort
#			unique
#			perl: regex replace
#				remove fa- prefix
#				remove stack
#				join with pipeline
#				clean last
#		fa custom js file
#			cat: concatenate fa js files with icons (brands and solid)
#			grep: filter only used fa icons
#			perl: add finish comma by regex replace
#			sed: add "{" in first line
#			sed: add "}" in last line
#			save as used-icons.json
fa-min:
	PATH_FA_USED_JSON=_assets/js/_includes/fa-used.json ;\
	USED_FA_ICONS=`\
		find _site -type f -iname "*.html" | \
		xargs grep -Eoh "fa-(\w|-){3,}" | \
		sort | \
		uniq | \
		perl -pe "s/^fa-//gm" | \
		perl -pe "s/^stack.*\n//gm" | \
		perl -pe "s/\n/|/gm" | \
		perl -pe "s/\|$$//gm"` ;\
	cat node_modules/@fortawesome/fontawesome-free/js/{brands,solid}.js | \
		grep -Eo "^\s{4}\"($${USED_FA_ICONS})\".+" | \
		perl -pe "s/\]$$/\],/gm" | \
		sed '1s/^/{\'$$'\n/g' | \
		sed '$$s/,$$/}/g' > \
		$${PATH_FA_USED_JSON} ;\
	[ -s $${PATH_FA_USED_JSON} ] || echo "null" > $${PATH_FA_USED_JSON}
