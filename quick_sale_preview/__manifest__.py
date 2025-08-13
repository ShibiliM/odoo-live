# -*- coding: utf-8 -*-
{
    'name': "Quick Sale Preview",
    'summary': "Preview sale orders directly from the tree view for faster sales operations.",
    'description': """
Quick Sale Preview
===================
This module allows users to quickly preview sale order details directly from the tree (list) view without opening the full form view.  
It improves sales team efficiency by saving time on order review and navigation.

**Key Features**
----------------
- Quick preview button in sale order list view.
- View essential sale order details in a popup or side panel.
- No need to navigate away from the list view.
- Fully compatible with Odoo 16.
- Works with Sale and Sale Management modules.
- Lightweight and easy to install.

**Use Case**
------------
Sales teams can instantly check:
- Order lines
- Customer details
- Delivery dates
- Order total  
...without leaving the sale orders list.

**Compatibility**
-----------------
Odoo 16 Community.

**Author**
----------
Developed by **Muhammed Shibili**.

    """,
    'author': "Muhammed Shibili",
    'website': "",
    'category': 'Sales/Sales',
    'version': '16.0.1.0',
    'depends': ['base', 'sale', 'sale_management'],
    'assets': {
        'web.assets_backend': [
            'quick_sale_preview/static/src/js/tree_view_extend.js',
            'quick_sale_preview/static/src/xml/tree_view_extend.xml',
        ]
    },
    'images': [
        'static/description/banner.png',
        'static/description/icon.png',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'AGPL-3',
    'support': 'muhammedshibilm987@gmail.com',
    'maintainer': 'Muhammed Shibili',

}
