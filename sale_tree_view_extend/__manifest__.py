{
    'name': 'Sale Tree View Extension',
    'version': '16.0.1.0.0',
    'category': 'Sales',
    'summary': 'Enhances the Sale Order tree view with additional features for better data visibility',
    'description': """
        This module extends the default Sale Order tree view in Odoo 16.
        - Allows pinning of sale orders to view detailed order line information directly in the list.
        - Displays product, quantity, unit price, taxes, and subtotal in the pinned section.
        - Improves user experience by providing quick insights without opening individual records.
    """,
    'author': 'Shibili',
    'website': '',
    'license': 'LGPL-3',
    'depends': ['sale', 'sale_management'],
    'data': [],
    'assets': {
        'web.assets_backend': [
            'sale_tree_view_extend/static/src/js/tree_view_extend.js',
            'sale_tree_view_extend/static/src/xml/tree_view_extend.xml',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}

