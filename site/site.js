/*
 * The design system's GitHub Pages site.
 *
 * Everything shown is read from the repo's own files at load time —
 * guidelines.md, tokens.json, design-system.json, package.json and each
 * components/<Name>/README.md and preview.html — so re-exporting the design
 * system updates this page with no changes here. The page itself is built
 * from the design system's components in components/bundle.js.
 */
(function () {
  "use strict";

  var h = React.createElement;
  var T = window.TwoPlusThree;
  var REPO = "https://github.com/weare2plus3/design-system";
  var PACKAGE = "@weare2plus3/design-system";
  // Component groups in the order the guidelines list them.
  var GROUP_ORDER = ["Actions", "Brand", "Forms", "Content", "Overlays", "Navigation"];

  /* ---------- Loading ---------- */

  function fetchText(path) {
    return fetch(path).then(function (r) {
      if (!r.ok) throw new Error(path + ": " + r.status);
      return r.text();
    });
  }
  function fetchJSON(path) {
    return fetchText(path).then(JSON.parse);
  }

  function load() {
    var names = Object.keys(T).filter(function (n) { return typeof T[n] === "function"; });
    return Promise.all([
      fetchJSON("tokens.json"),
      fetchText("guidelines.md"),
      fetchJSON("design-system.json").catch(function () { return null; }),
      fetchJSON("package.json").catch(function () { return {}; }),
      Promise.all(names.map(function (name) {
        return Promise.all([
          fetchText("components/" + name + "/README.md").catch(function () { return ""; }),
          fetchText("components/" + name + "/preview.html").catch(function () { return ""; })
        ]).then(function (r) { return { name: name, readme: r[0], preview: parsePreview(r[1]) }; });
      }))
    ]).then(function (r) {
      var index = r[2];
      var groups = index && index.groups ? index.groups : [];
      return Promise.all(groups.map(function (g) {
        return fetchText("assets/" + g.toLowerCase() + "/README.md").catch(function () { return ""; });
      })).then(function (readmes) {
        var assetGroups = groups.map(function (g, i) {
          var group = index.assetGroups[g];
          return { name: g, folder: g.toLowerCase(), order: group.order, files: group.files, readme: readmes[i] };
        });
        return { tokens: r[0], guide: r[1], pkg: r[3], components: r[4], assetGroups: assetGroups };
      });
    });
  }

  // A preview.html is a small document: a `@dsCard` comment with its group and
  // height, a #root element and a script that renders into it.
  function parsePreview(html) {
    if (!html) return null;
    var meta = (html.match(/<!--\s*@dsCard([^>]*)-->/) || [null, ""])[1];
    function attr(k) {
      var m = meta.match(new RegExp(k + '="?([\\w-]+)"?'));
      return m ? m[1] : null;
    }
    var doc = new DOMParser().parseFromString(html, "text/html");
    var root = doc.getElementById("root");
    return {
      group: attr("group") || "Other",
      height: Number(attr("height")) || 160,
      rootStyle: root ? root.getAttribute("style") || "" : "",
      script: Array.prototype.map.call(doc.querySelectorAll("script"), function (s) { return s.textContent; }).join("\n")
    };
  }

  /* ---------- Markdown (the small subset the guidelines use) ---------- */

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  // Inline formatting. A `code` span that names a colour token gets a swatch chip.
  function inline(s, colours) {
    var codes = [];
    s = esc(s).replace(/`([^`]+)`/g, function (_, c) { codes.push(c); return "\u0000" + (codes.length - 1) + "\u0000"; });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (all, text, url) {
      return /^(https?:|#|\.{0,2}\/)/.test(url) ? '<a href="' + url + '">' + text + "</a>" : all;
    });
    return s.replace(/\u0000(\d+)\u0000/g, function (_, i) {
      var c = codes[Number(i)];
      var chip = colours && colours[c] ? '<span class="chip" style="background:var(--' + c + ')"></span>' : "";
      return "<code>" + chip + c + "</code>";
    });
  }

  function markdown(src, colours) {
    var out = "", para = [], list = null;
    function flushPara() {
      if (para.length) out += "<p>" + inline(para.join(" "), colours) + "</p>";
      para = [];
    }
    function flushList() {
      if (list) out += "<ul>" + list.map(function (i) { return "<li>" + inline(i, colours) + "</li>"; }).join("") + "</ul>";
      list = null;
    }
    src.replace(/\r/g, "").split("\n").forEach(function (line) {
      var m;
      if (/^\s*$/.test(line)) { flushPara(); flushList(); return; }
      if ((m = line.match(/^(#{1,4})\s+(.*)/))) {
        flushPara(); flushList();
        var n = Math.min(m[1].length + 2, 6);
        out += "<h" + n + ">" + inline(m[2], colours) + "</h" + n + ">";
        return;
      }
      if ((m = line.match(/^\s*[-*]\s+(.*)/))) { flushPara(); (list = list || []).push(m[1]); return; }
      if (list && /^\s+\S/.test(line)) { list[list.length - 1] += " " + line.trim(); return; }
      flushList();
      para.push(line.trim());
    });
    flushPara(); flushList();
    return out;
  }

  function Prose(props) {
    return h("div", { className: "prose " + (props.className || ""), dangerouslySetInnerHTML: { __html: markdown(props.src, props.colours) } });
  }

  // guidelines.md: an intro paragraph, then `## ` sections.
  function splitGuide(src) {
    var parts = src.split(/^## /m);
    var intro = parts.shift().trim();
    return {
      intro: intro,
      sections: parts.map(function (p) {
        var nl = p.indexOf("\n");
        var title = p.slice(0, nl).trim();
        return { title: title, id: slug(title), body: p.slice(nl + 1).trim() };
      })
    };
  }
  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  // A component README: "# Name", a one-sentence summary, then guidelines.
  function splitReadme(src) {
    var body = src.replace(/^#\s+.*\n+/, "").trim();
    var cut = body.indexOf("\n\n");
    return cut < 0 ? { summary: body, rest: "" } : { summary: body.slice(0, cut), rest: body.slice(cut + 2) };
  }

  /* ---------- Tokens ---------- */

  function themes(tokens) {
    return tokens.color.themes.map(function (t) { return t.id; });
  }
  // A colour token's value in one theme, following "{alias}" references.
  function colourValue(tokens, name, theme, depth) {
    var tok = tokens.color.tokens.filter(function (t) { return t.name === name; })[0];
    if (!tok || (depth || 0) > 4) return null;
    var v = typeof tok.value === "string" ? tok.value : tok.value[theme] || tok.value[themes(tokens)[0]];
    var alias = /^\{(.+)\}$/.exec(v);
    return alias ? colourValue(tokens, alias[1], theme, (depth || 0) + 1) : v;
  }
  function colourNames(tokens) {
    var out = {};
    tokens.color.tokens.forEach(function (t) { out[t.name] = true; });
    return out;
  }

  /* ---------- Page parts ---------- */

  function Section(props) {
    return h("section", { id: props.id, className: "section", "aria-labelledby": props.id + "-title" },
      h("div", { className: "section-head" },
        h("p", { className: "numeral section-num" }, String(props.n).padStart(2, "0")),
        h("h2", { id: props.id + "-title", className: "display section-title" }, props.title.toLowerCase())),
      props.body ? h(Prose, { src: props.body, colours: props.colours }) : null,
      props.children ? h("div", { className: "specimen" }, props.children) : null);
  }

  function Subhead(props) {
    return h("h3", { className: "heading subhead" }, props.children);
  }

  function Colours(props) {
    var tokens = props.tokens;
    var ids = themes(tokens);
    return h("div", { className: "swatches" },
      tokens.color.tokens.map(function (t) {
        return h("article", { key: t.name, className: "swatch" },
          h("div", { className: "swatch-themes" },
            ids.map(function (id) {
              var v = colourValue(tokens, t.name, id);
              return h("div", { key: id, className: "swatch-half", style: { background: colourValue(tokens, "paper", id), color: colourValue(tokens, "ink", id) } },
                h("div", { className: "swatch-fill", style: { background: v, borderColor: colourValue(tokens, "line", id) } }),
                h("div", { className: "swatch-value" }, h("span", null, id), h("code", null, v)));
            })),
          h("div", { className: "swatch-body" },
            h("h3", { className: "swatch-name" }, h("code", null, t.name)),
            h("div", { className: "swatch-usage", dangerouslySetInnerHTML: { __html: inline(t.usage || "", props.colours) } })));
      }));
  }

  function Type(props) {
    var families = props.tokens.type.families;
    return h("div", { className: "type-groups" },
      props.tokens.type.groups.map(function (g) {
        return h("div", { key: g.name, className: "type-group" },
          h("p", { className: "label eyebrow" }, g.name),
          g.styles.map(function (s) {
            var px = parseFloat(s.fontSize);
            // Large display styles scale down on narrow screens.
            var fit = px > 40 ? { fontSize: "min(" + s.fontSize + ", " + (px / 6.5).toFixed(1) + "vw)" } : null;
            return h("div", { key: s.name, className: "type-row" },
              h("div", { className: "type-meta" },
                h("code", { className: "type-name" }, s.name),
                h("span", null, s.fontSize + " / " + s.lineHeight + " / " + s.fontWeight),
                h("span", null, (families[g.family] || "").split(",")[0].replace(/"/g, ""))),
              h("div", { className: "type-sample" },
                h("p", { className: s.name, style: fit }, s.sample || s.name),
                s.usage ? h("p", { className: "type-usage" }, s.usage) : null));
          }));
      }));
  }

  function Space(props) {
    var t = props.tokens;
    return h(React.Fragment, null,
      h(Subhead, null, "Spacing"),
      h("div", { className: "space-rows" },
        t.spacing.tokens.map(function (s) {
          return h("div", { key: s.name, className: "space-row" },
            h("code", null, s.name),
            h("span", { className: "space-value" }, s.value),
            h("div", { className: "space-bar-wrap" }, h("div", { className: "space-bar", style: { width: s.value } })),
            h("span", { className: "space-usage" }, s.usage));
        })),
      h(Subhead, null, "Radius"),
      h("div", { className: "radius-tiles" },
        t.radius.tokens.map(function (r) {
          var pill = parseFloat(r.value) > 100;
          return h("div", { key: r.name, className: "radius-tile" },
            h("div", { className: "radius-shape" + (pill ? " is-pill" : ""), style: { borderRadius: r.value } }),
            h("code", null, r.name),
            h("span", { className: "radius-value" }, r.value),
            h("p", { className: "radius-usage" }, r.usage));
        })));
  }

  function Elevation(props) {
    return h("div", { className: "shadow-tiles" },
      props.tokens.shadow.tokens.map(function (s) {
        return h("div", { key: s.name, className: "shadow-tile", style: { boxShadow: "var(--" + s.name + ")" } },
          h("code", null, s.name),
          h("p", null, s.usage));
      }));
  }

  // Runs a component's preview.html script inline, rendering into a fresh
  // element in place of the preview's #root.
  function Preview(props) {
    var ref = React.useRef(null);
    var p = props.preview;
    React.useEffect(function () {
      var stage = ref.current;
      if (!stage || !p) return undefined;
      var el = document.createElement("div");
      el.setAttribute("style", p.rootStyle);
      stage.appendChild(el);
      var root = null;
      var shimDocument = { getElementById: function () { return el; } };
      var shimReactDOM = { createRoot: function (node) { root = ReactDOM.createRoot(node); return root; } };
      try {
        new Function("document", "ReactDOM", p.script)(shimDocument, shimReactDOM);
      } catch (e) {
        el.textContent = "This preview didn't load: " + e.message;
      }
      return function () {
        setTimeout(function () { if (root) root.unmount(); el.remove(); });
      };
    }, [p]);
    if (!p) return null;
    return h("div", { ref: ref, className: "stage", style: { minHeight: p.height + "px" } });
  }

  function Components(props) {
    var byGroup = {};
    props.components.forEach(function (c) {
      var g = c.preview ? c.preview.group : "Other";
      (byGroup[g] = byGroup[g] || []).push(c);
    });
    var groups = GROUP_ORDER.filter(function (g) { return byGroup[g]; })
      .concat(Object.keys(byGroup).filter(function (g) { return GROUP_ORDER.indexOf(g) < 0; }));
    return h("div", { className: "components" },
      groups.map(function (g) {
        return h("div", { key: g, className: "component-group" },
          h("p", { className: "label eyebrow" }, g),
          byGroup[g].map(function (c) {
            var doc = splitReadme(c.readme);
            return h("article", { key: c.name, id: "component-" + slug(c.name), className: "component" },
              h("h3", { className: "heading" }, c.name),
              h(Prose, { src: doc.summary, colours: props.colours, className: "component-summary" }),
              h(Preview, { preview: c.preview }),
              doc.rest ? h(Prose, { src: doc.rest, colours: props.colours }) : null);
          }));
      }));
  }

  function Icons() {
    return h("ul", { className: "icon-grid" },
      T.Icon.names.map(function (n) {
        return h("li", { key: n }, h(T.Icon, { name: n, size: 24 }), h("code", null, n));
      }));
  }

  // The logo files are fixed-colour, so each sits on the ground it's made for.
  function ground(tokens, group, file) {
    if (/reversed|light/.test(file)) return colourValue(tokens, "paper", "dark");
    if (group === "Favicons") return "var(--paper)";
    return colourValue(tokens, "paper", "light");
  }

  function Assets(props) {
    return h(React.Fragment, null,
      h("div", { className: "logo-live" },
        h(T.Logo, { height: 96 }),
        h(T.Logo, { variant: "mark", height: 64 }),
        h(T.Logo, { height: 64, mono: true, label: "TWO+THREE, one colour" })),
      props.assetGroups.map(function (g) {
        return h("div", { key: g.name, className: "asset-group" },
          h(Subhead, null, g.name),
          g.readme ? h(Prose, { src: g.readme.replace(/^#\s+.*\n+/, ""), colours: props.colours }) : null,
          h("ul", { className: "asset-tiles asset-tiles-" + g.folder },
            g.order.map(function (file) {
              var href = "assets/" + g.folder + "/" + file;
              return h("li", { key: file, className: "asset-tile" },
                h("div", { className: "asset-preview", style: { background: ground(props.tokens, g.name, file) } },
                  h("img", { src: href, alt: "" })),
                h("div", { className: "asset-caption" },
                  h("code", null, file),
                  h(T.Button, { variant: "quiet", size: "sm", href: href, download: file, icon: "download", "aria-label": "Download " + file }, "Download")));
            })));
      }));
  }

  function CodeBlock(props) {
    var st = React.useState(false);
    function copy() {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(props.code).then(function () {
        st[1](true);
        setTimeout(function () { st[1](false); }, 1500);
      });
    }
    return h("div", { className: "code-block" },
      props.title ? h("p", { className: "label eyebrow" }, props.title) : null,
      h("div", { className: "code-wrap" },
        h("pre", null, h("code", null, props.code)),
        h("button", { type: "button", className: "copy", onClick: copy }, st[0] ? "Copied" : "Copy")));
  }

  function Use(props) {
    var v = props.pkg.version ? "v" + props.pkg.version : "main";
    var cdn = "https://cdn.jsdelivr.net/gh/weare2plus3/design-system@" + v;
    return h("section", { id: "use", className: "section", "aria-labelledby": "use-title" },
      h("div", { className: "section-head" },
        h("p", { className: "numeral section-num" }, String(props.n).padStart(2, "0")),
        h("h2", { id: "use-title", className: "display section-title" }, "use it")),
      h("div", { className: "prose" },
        h("p", null, "Install a tagged version straight from GitHub. Tags only move when the design system is re-exported, so a project changes only when you bump the version.")),
      h("div", { className: "specimen use-grid" },
        h(Subhead, null, "In a JavaScript project"),
        h(CodeBlock, { title: "package.json", code: '"dependencies": {\n  "' + PACKAGE + '": "github:weare2plus3/design-system#' + v + '"\n}' }),
        h(CodeBlock, { title: "Load the tokens once, globally", code: 'import "' + PACKAGE + '/tokens.css";' }),
        h(CodeBlock, { title: "tailwind.config.js", code: 'presets: [require("' + PACKAGE + '/tailwind-preset")],' }),
        h(CodeBlock, { title: "The logo in React", code: 'import { Logo } from "' + PACKAGE + '/react";\n\n<Logo height={48} />' }),
        h(Subhead, null, "In plain HTML"),
        h(CodeBlock, { title: "Tokens, components and React 18", code: [
          '<link rel="stylesheet" href="' + cdn + '/tokens.css">',
          '<link rel="stylesheet" href="' + cdn + '/components/bundle.css">',
          '<script src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>',
          '<script src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>',
          '<script src="' + cdn + '/components/bundle.js"></script>'
        ].join("\n") })));
  }

  // The cover's block arrangement: outlined plates, the logo's + in signal and one ochre square.
  function CoverArt() {
    var plusGrid = [104, 136, 168, 200].map(function (y) {
      return [312, 344, 376, 408, 440].map(function (x) {
        return "M" + x + " " + y + "h16M" + (x + 8) + " " + (y - 8) + "v16";
      }).join(" ");
    }).join(" ");
    return h("svg", { className: "cover-art", viewBox: "0 0 480 296", "aria-hidden": "true", focusable: "false" },
      h("line", { className: "rule", x1: 0, y1: 64.5, x2: 480, y2: 64.5 }),
      h("line", { className: "rule", x1: 0, y1: 232.5, x2: 480, y2: 232.5 }),
      h("line", { className: "rule", x1: 176.5, y1: 0, x2: 176.5, y2: 296 }),
      h("line", { className: "rule", x1: 288.5, y1: 0, x2: 288.5, y2: 296 }),
      h("rect", { className: "edge", x: 0.75, y: -16, width: 160, height: 248 }),
      h("rect", { className: "edge", x: 176.75, y: 96.75, width: 96, height: 135.5 }),
      h("rect", { className: "edge", x: 288.75, y: 64.75, width: 220, height: 167.5 }),
      h("path", { className: "sage", d: "M48 136h64v16H48Z M72 112h16v64H72Z" }),
      h("rect", { className: "ochre", x: 208, y: 48, width: 32, height: 32 }),
      h("path", { className: "grid", d: plusGrid }));
  }

  function Hero(props) {
    return h("div", { className: "hero", id: "top" },
      h("div", { className: "hero-words" },
        h("p", { className: "label eyebrow" }, props.pkg.version ? "Version " + props.pkg.version : "Design system"),
        h("h1", { className: "hero-title" },
          h(T.Logo, { height: 96, className: "hero-logo" }),
          h("span", { className: "display-xl" }, "Design system")),
        h(Prose, { src: props.intro, colours: props.colours, className: "body-lg lead" }),
        h("p", { className: "tagline" }, "software. culture. gifts. books. design."),
        h("div", { className: "actions" },
          h(T.Button, { variant: "secondary", href: REPO, iconAfter: "external" }, "View on GitHub"),
          h(T.Button, { variant: "quiet", href: "#use" }, "Use it in a project"))),
      h("div", { className: "hero-art" }, h(CoverArt)));
  }

  function Contents(props) {
    return h("nav", { className: "toc", "aria-label": "Contents" },
      h("ol", null,
        props.items.map(function (it) {
          return h("li", { key: it.id },
            h("a", { href: "#" + it.id, "aria-current": props.active === it.id ? "location" : undefined },
              h("span", { className: "toc-n" }, String(it.n).padStart(2, "0")),
              h("span", null, it.title)));
        })));
  }

  function Footer(props) {
    return h("footer", { className: "footer" },
      h(T.Logo, { variant: "mark", height: 32, label: "" }),
      h("p", null, "TWO+THREE design system" + (props.pkg.version ? ", version " + props.pkg.version : "") + "."),
      h("p", null,
        h("a", { href: REPO }, "GitHub"), " · ",
        h("a", { href: "https://2plus3.studio" }, "2plus3.studio")),
      h("p", { className: "legal" }, "© " + new Date().getFullYear() + " TWO PLUS THREE LIMITED"));
  }

  /* ---------- Theme ---------- */

  function readTheme() {
    try { return localStorage.getItem("tt-theme") || "system"; } catch (e) { return "system"; }
  }
  function applyTheme(t) {
    if (t === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
    try {
      if (t === "system") localStorage.removeItem("tt-theme");
      else localStorage.setItem("tt-theme", t);
    } catch (e) {}
  }

  /* ---------- App ---------- */

  // Which specimen goes under each guidelines section, matched on the section's slug.
  var SPECIMENS = [
    ["colour", function (d) { return h(Colours, d); }],
    ["type", function (d) { return h(Type, d); }],
    ["space", function (d) { return h(Space, d); }],
    ["elevation", function (d) { return h(Elevation, d); }],
    ["components", function (d) { return h(Components, d); }],
    ["logo", function (d) { return h(Assets, d); }],
    ["iconography", function () { return h(Icons); }]
  ];
  function specimenFor(id, data) {
    var match = SPECIMENS.filter(function (s) { return id.indexOf(s[0]) === 0; })[0];
    return match ? match[1](data) : null;
  }

  function App(props) {
    var data = props.data;
    var guide = React.useMemo(function () { return splitGuide(data.guide); }, [data.guide]);
    var colours = React.useMemo(function () { return colourNames(data.tokens); }, [data.tokens]);
    var items = guide.sections.map(function (s, i) { return { id: s.id, title: s.title, n: i + 1 }; })
      .concat([{ id: "use", title: "Use it", n: guide.sections.length + 1 }]);

    var themeState = React.useState(readTheme);
    var theme = themeState[0];
    React.useEffect(function () { applyTheme(theme); }, [theme]);

    var scrolled = React.useState(false);
    React.useEffect(function () {
      function onScroll() { scrolled[1](window.scrollY > 0); }
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return function () { window.removeEventListener("scroll", onScroll); };
    }, []);

    var activeState = React.useState(items[0].id);
    React.useEffect(function () {
      if (!("IntersectionObserver" in window)) return undefined;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) activeState[1](e.target.id); });
      }, { rootMargin: "-30% 0px -65% 0px" });
      items.forEach(function (it) { var el = document.getElementById(it.id); if (el) io.observe(el); });
      return function () { io.disconnect(); };
    }, []);
    var active = activeState[0];

    var nav = [
      { label: "Guidelines", href: "#" + items[0].id, current: ["components", "logo", "use"].indexOf(active) < 0 },
      { label: "Components", href: "#components", current: active === "components" },
      { label: "Logo", href: "#logo", current: active === "logo" },
      { label: "Use it", href: "#use", current: active === "use" }
    ];
    var themeLabels = { system: "System", light: "Light", dark: "Dark" };
    var themeMenu = h(T.Menu, {
      label: "Theme: " + themeLabels[theme],
      align: "end",
      items: ["system", "light", "dark"].map(function (t) {
        // The trigger's caption names the current theme; the tick repeats it visually.
        return { label: themeLabels[t], icon: t === theme ? "check" : undefined, onSelect: function () { themeState[1](t); } };
      })
    });

    var specimenData = { tokens: data.tokens, colours: colours, components: data.components, assetGroups: data.assetGroups };

    return h(React.Fragment, null,
      h("div", { className: "site-header" },
        h(T.Header, { nav: nav, logoHref: "#top", elevated: scrolled[0], action: themeMenu })),
      h("div", { className: "layout" },
        h(Contents, { items: items, active: active }),
        h("main", { id: "main", tabIndex: -1 },
          h(Hero, { intro: guide.intro, colours: colours, pkg: data.pkg }),
          guide.sections.map(function (s, i) {
            return h(Section, { key: s.id, id: s.id, n: i + 1, title: s.title, body: s.body, colours: colours }, specimenFor(s.id, specimenData));
          }),
          h(Use, { n: items.length, pkg: data.pkg }),
          h(Footer, { pkg: data.pkg }))));
  }

  var root = ReactDOM.createRoot(document.getElementById("app"));
  load().then(function (data) {
    root.render(h(App, { data: data }));
    // Content arrives after the first paint, so honour a #section link now.
    if (location.hash) {
      requestAnimationFrame(function () {
        var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) el.scrollIntoView();
      });
    }
  }).catch(function (e) {
    root.render(h("p", { className: "noscript" }, "The design system didn't load (" + e.message + "). The files are on ", h("a", { href: REPO }, "GitHub"), "."));
  });
})();
