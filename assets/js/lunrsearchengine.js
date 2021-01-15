---
layout: null
---
{% assign counter = 0 %}
var documents = [{% for page in site.pages %}{% if page.url contains '.xml' or page.url contains 'assets' or page.url contains 'category' or page.url contains 'tag' %}{% else %}{
  "id": {{ counter }},
  "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
  "title": "{{ page.title }}",
  "body": "{{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}"{% assign counter = counter | plus: 1 %}
  }, {% endif %}{% endfor %}{% for page in site.without-plugin %}{
  "id": {{ counter }},
  "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
  "title": "{{ page.title }}",
  "body": "{{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}"{% assign counter = counter | plus: 1 %}
  }, {% endfor %}{% for page in site.posts %}{
  "id": {{ counter }},
  "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
  "title": "{{ page.title }}",
  "body": "{{ page.date | date: "%Y/%m/%d" }} - {{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}"{% assign counter = counter | plus: 1 %}
  }{% if forloop.last %}{% else %}, {% endif %}{% endfor %}];

var idx = lunr(function () {
  this.field('title')
  this.field('body')
  this.ref('id')
  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})

function lunr_search(term) {
  if(term) {
    document.getElementById('resultsmodal').classList.add('show');
    document.body.classList.add('overflow-hidden');
    document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Resultados de búsqueda de '" + term + "'</h5>";
    // put results on the screen.
    var results = idx.search(term);
    if(results.length>0){
      // console.log(idx.search(term));
      // if results
      for (var i = 0; i < results.length; i++) {
        // more statements
        var ref = results[i]['ref'];
        var url = documents[ref]['url'];
        var title = documents[ref]['title'];
        var body = documents[ref]['body'].substring(0,160)+'...';
        document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'><a href='" + url + "'><span class='h4'>" + title + "</span><span class='small d-block text-muted'>"+ body +"</span><span class='d-none'>"+ url +"</span></a></li>";
      }
    } else {
      document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No se encontraron resultados. ¡Cierra y prueba una búsqueda diferente!</li>";
    }
  }
  return false;
}