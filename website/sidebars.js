// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  Guides: [
    "index",
    'installation',
    'trex_tableau_help',
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
      label: 'Extension Fundamentals',
      link: {  type: 'doc', id: 'index' },
      items: [
      'trex_getdata',
      'trex_configure',
      'trex_tableau_viz',
      'trex_format',
      'trex_show_hide',
      'trex_events',
      'trex_typescript',
    ],
    },

    { 
      type: 'category',
      label: 'Security and Data Access',
      link: {  type: 'doc', id: 'index' },
      items: [
      'trex_data_access',
      'trex_security',
      'trex_xss_guidance',
      'trex_sandbox_test',
      'trex_oauth',
    ],
    },

    { 
      type: 'category',
      label: 'Debugging and Troubleshooting',
      link: {  type: 'doc', id: 'index' },
      items: [
      'trex_debugging',
      'trex_debug_server',
      'trex_logging',
      'trex_error_handling',
    ],
    },

    { 
      type: 'category',
      label: 'Publishing and Distribution',
      link: {  type: 'doc', id: 'index' },
      items: [
      'trex_publish',
      'trex_sandbox_publish',
      'trex_contributing',
    ],
    },

    {
      type: 'category',
      label: 'API Reference',
   /*   link: { href: "https://github.com/tableau/hyper-api-samples" }, */
      items: [
      { type: 'link', label: "Samples", href: "https://github.com/tableau/extensions-api-preview/tree/main/Samples" },
      { type: 'link', label: "API Reference",  href: 'pathname:///api' },
      'trex_tableau_viz_ref',
      'trex_tableau_viz_ref_v1',
      'trex_tableau_viz_ref_v2',
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
