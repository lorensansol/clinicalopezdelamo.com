---
title: Contacto
---
<h1>{{page.name | remove: ".md"}}</h1>
<form action="https://formspree.io/{{site.email}}" method="POST">    
<p class="mb-4">Puedes contactar mediante email (preferible) o mediante el siguiente formulario. ¡Le responderemos lo antes posible!</p>
<p class="mb-4"><a class="btn btn-primary w-100" href="&#x6D;&#x61;&#x69;&#x6C;&#x74;&#x6F;&#x3A;{{site.email}}">{{site.email}}</a></p>
<div class="form-group row">
  <div class="col-md-6">
    <input class="form-control" type="text" name="name" placeholder="Nombre *" required>
  </div>
  <div class="col-md-6">
    <input class="form-control" type="email" name="_replyto" placeholder="E-mail *" required>
  </div>
</div>
<textarea rows="8" class="form-control mb-3" name="message" placeholder="Mensaje *" required></textarea>    
<button class="btn btn-secondary w-100" type="submit">Enviar</button>
</form>