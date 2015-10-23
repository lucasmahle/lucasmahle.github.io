---
layout: post
title:  "Welcome to Jekyll!"
date:   2015-10-07 19:17:59
category: Jekyll
author: Lucas Mahle
image: /assets/images/background_image.jpg
tags: 
- primeiro
- post
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.
<!--more--><span id="#more"></span>
To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby linenos %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

{% highlight javascript linenos %}
var Collapse = function (element, options) {
	this.$element      = $(element)
	this.options       = $.extend({}, Collapse.DEFAULTS, options)
	this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
	                       '[data-toggle="collapse"][data-target="#' + element.id + '"]')
	this.transitioning = null

	if (this.options.parent) {
		this.$parent = this.getParent()
	} else {
		this.addAriaAndCollapsedClass(this.$element, this.$trigger)
	}

	if (this.options.toggle) this.toggle()
}
{% endhighlight %}


{% highlight html linenos %}
<div class="entry-meta">
  <span class="author vcard">
    Por: <a class="url" href="/sobre">Lucas Mahle</a>
  </span>
</div>
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help
