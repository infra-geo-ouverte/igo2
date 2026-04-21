## conf.py
# pour build the la doc ici: https://app.readthedocs.org/projects/igo2/


# These folders are copied to the documentation's HTML output
html_static_path = ['_static']

# These paths are either relative to html_static_path
# or fully qualified paths (eg. https://...)
html_css_files = [
    'custom.css',
]
html_theme = "sphinx_rtd_theme"

# source_suffix = ['.rst', '.md']
source_suffix = '.rst'

# The encoding of source files.
#
# source_encoding = 'utf-8-sig'

# The master toctree document.
master_doc = 'index'