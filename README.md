# clinicalopezdelamo.com

[![Clínica López del Amo](/wp-content/uploads/2016/06/cropped-logo-cinica-lopez-del-amo.jpg)](https://clinicalopezdelamo.com/)

## Jekyll

### Install

Jekyll install from root directory

```bash
gem install bundler
bundle install
```

### Server

Jekyll server start

```bash
# local (development)
bundle exec jekyll serve --watch --config _config.yml,_config_dev.yml

# production
JEKYLL_ENV=production bundle exec jekyll serve --watch
```

## Pug

Pug precompile watcher

```bash
pug --out _layouts/ _pug/*.pug --watch
```

## Assets

Optimice assets

### CLI

Optimice assets with CLI:

- JS: minify
- CSS: purge

```bash
# minify js files
terser _site/_assets/js/scripts.js --comments false --output assets/js/scripts.js
terser _site/_assets/js/smooth-scroll.js --comments false --output assets/js/smooth-scroll.js
terser _site/_assets/js/lunr.js --comments false --output assets/js/lunr.js
# terser _site/_assets/js/lunrsearchengine.js --comments false --output assets/js/lunrsearchengine.js

# purge css
purgecss --css _site/_assets/css/styles.css --content _site/**/*.html,_site/assets/js/*.js --output assets/css/

# remove css comments
perl -pie "s[/\*.*\*/][]gi" assets/css/styles.css
```

### Gulp

Optimice assets with gulp (in parent directory):

- JS
  - babel
  - minify
- CSS
  - purge
  - comments
  - cssnano (minify)
  - autoprefixer
  - critical
- IMG
  - compress

```bash
# create an optimal used-icons.json with all the fontawesome used icons
# used fa icons
## fin all html files
## xargs: in each
## grep: get fa icons by regex
## sort
## unique
## perl: regex replace
### remove fa- prefix
### remove stack
### join with pipeline
### clean last
usedFaIcons=`find _site -type f -iname "*.html" | xargs grep -Eoh "fa-(\w|-){3,}" | sort | uniq | perl -pe "s/^fa-//gm" | perl -pe "s/^stack.*\n//gm" | perl -pe "s/\n/|/gm" | perl -pe "s/\|$//gm"`
# fa custom js file
## cat: concatenate fa js files with icons (brands and solid)
## grep: filter only used fa icons
## perl: add finish comma by regex replace
## sed: add "{" in first line
## sed: add "}" in last line
## save as used-icons.json
cat _assets/js/_includes/fontawesome/{brands,solid}.js | grep -Eo "^\s{4}\"($usedFaIcons)\".+" | perl -pe "s/\]$/\],/gm" | sed '1s/^/{\'$'\n/g' | sed '$s/,$/}/g' > _assets/js/_includes/fontawesome/used-icons.json

## minify js files
cd ../;gulp js_clinicalopezdelamo.com;cd clinicalopezdelamo.com
## critical css
cd ../;gulp critical_clinicalopezdelamo.com;cd clinicalopezdelamo.com
## minify css files
cd ../;gulp css_clinicalopezdelamo.com;cd clinicalopezdelamo.com
## compress img
cd ../;gulp img_clinicalopezdelamo.com;cd clinicalopezdelamo.com
## compress fonts
cd ../;gulp fonts3_clinicalopezdelamo.com;cd clinicalopezdelamo.com
```

## Deploy

Deploy with date now

```bash
# deploy with date now
git add .;git commit -m "Update: `date +'%Y-%m-%d %H:%M:%S'`";git push
```