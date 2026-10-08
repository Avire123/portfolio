import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path

# Set Streamlit Page Configuration
st.set_page_config(
    page_title="John Isaac Mcharo | Personal Portfolio",
    page_icon="🌟",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to eliminate Streamlit padding and header
st.markdown(
    """
    <style>
        #MainMenu {visibility: hidden;}
        header {visibility: hidden;}
        footer {visibility: hidden;}
        .block-container {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
        }
        iframe {
            display: block;
            border: none;
            width: 100%;
        }
    </style>
    """,
    unsafe_allow_html=True
)

def get_bundled_html():
    base_dir = Path(__file__).parent
    
    html_path = base_dir / "index.html"
    css_path = base_dir / "style.css"
    js_path = base_dir / "script.js"
    
    html_content = html_path.read_text(encoding="utf-8") if html_path.exists() else "<h1>Portfolio</h1>"
    css_content = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
    js_content = js_path.read_text(encoding="utf-8") if js_path.exists() else ""
    
    # Inline CSS
    if '<link rel="stylesheet" href="style.css">' in html_content:
        html_content = html_content.replace(
            '<link rel="stylesheet" href="style.css">',
            f"<style>\n{css_content}\n</style>"
        )
    else:
        html_content = html_content.replace(
            '</head>',
            f"<style>\n{css_content}\n</style>\n</head>"
        )
        
    # Inline JS
    if '<script src="script.js"></script>' in html_content:
        html_content = html_content.replace(
            '<script src="script.js"></script>',
            f"<script>\n{js_content}\n</script>"
        )
    else:
        html_content = html_content.replace(
            '</body>',
            f"<script>\n{js_content}\n</script>\n</body>"
        )
        
    return html_content

# Render the self-contained portfolio HTML
bundled_html = get_bundled_html()
components.html(bundled_html, height=1800, scrolling=True)

