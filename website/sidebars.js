// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  Docs: [
    "index",
    'installation',
    {
      type: 'category',
      label: 'Viz Extensions',
      link: { type: 'doc', id: 'vizext/index' }, 
      items: [
        'vizext/trex_viz_getstarted',
        'vizext/trex_viz_overview',
        'vizext/trex_viz_create',
        'vizext/trex_viz_debug_server',
        'vizext/trex_viz_manifest',
        'vizext/trex_viz_examples',
      ],
    }, 
    {
      type: 'category',
      label: 'Dashboard Extensions',
      link: { type: 'doc', id: 'dashext/index' }, 
      items: [
        'dashext/trex_getstarted',
        'dashext/trex_create',
        'dashext/trex_overview',
        'dashext/trex_debug_server', 
        'dashext/trex_manifest',
        'dashext/trex_examples', 
      ],
    }, 
    { 
      type: 'category',
      label: 'Basic Concepts',
      link: {  type: 'doc', id: 'index' },
      items: [
      'trex_api_about',
      'trex_reload',
    ],
    },

    {
      type: 'category',
      label: 'API Reference',
   /*   link: { href: "https://github.com/tableau/hyper-api-samples" }, */
      items: [
      { type: 'link', label: "Examples", href: "https://github.com/tableau/extensions-api-preview/tree/main/Samples" },
      { type: 'link', label: "API Reference",  href: 'pathname:///api' },
   
      ],
    }, 


  ],

  Design: [
    "ux_design",
    {
      type: 'category',
      label: 'Interaction Guidelines',
      items: [
        'Interaction_Guidelines/ux_build_test',
        'Interaction_Guidelines/ux_components_modes',
        'Interaction_Guidelines/ux_controls_ui_patterns',
      ],
    },
    {
      type: 'category',
      label: 'Style Guidelines',
      items: [
        'Style_Guidelines/ux_branding',
        'Style_Guidelines/ux_layout',
        'Style_Guidelines/ux_color',
        'Style_Guidelines/ux_fonts',
      ],
    },
    "ux_extension_gallery",
  ],
};

/*
const uxSidebar = {
  docs: [
    "ux_design",
    {
      type: 'category',
      label: 'Interaction Guidelines',
      items: [
        'Interaction_Guidelines/ux_build_test',
        'Interaction_Guidelines/ux_components_modes',
        'Interaction_Guidelines/ux_control_ui_patterns',
      ],
    },
    {
      type: 'category',
      label: 'Style Guidelines',
      items: [
        'Style_Guidelines/ux_branding',
        'Style_Guidelines/ux_layout',
        'Style_Guidelines/ux_color',
        'Style_Guidelines/ux_fonts',
      ],
    },
    "ux_extension_gallery",
  ],


}; */

module.exports = { sidebars };
