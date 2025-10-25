/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { ListRenderer } from "@web/views/list/list_renderer";
var rpc = require('web.rpc');
var pinnedRecords = [];

// Patch ListRenderer to add pinned rows functionality
patch(ListRenderer.prototype, '/list_tree_pin_records/static/src/js/pin_records.js', {
    async pin_record(ev, record) {
        var row = $(ev.target).closest('tr')[0];
        var index = pinnedRecords.indexOf(record.resId);
        var pinIcon = $(ev.target);

        // If already pinned, unpin it
        if (index !== -1) {
            row.style.background = 'white';
            pinnedRecords.splice(index, 1);
            $(row).next('.pinned-info').remove();
            pinIcon.removeClass('fa-caret-down').addClass('fa-caret-right');
        } else {
            pinnedRecords.push(record.resId);

            // Fetch sale order lines
            const orderLines = await this._fetchOrderLines(record.resId);

            // Table header
            const tableHeader = `
                <tr style="background: #d1e7fd;">
                    <th style="border: 1px solid #ccc; padding: 8px;">Product</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Quantity</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Unit Price</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Taxes</th>
                    <th style="border: 1px solid #ccc; padding: 8px;">Subtotal</th>
                </tr>
            `;

            // Table rows
            const tableRows = orderLines.map(line => {
                const taxes = line.tax_id.map(t => t[1]).join(', ') || '-';
                return `
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 8px;">${line.product_id[1]}</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${line.product_uom_qty}</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${line.price_unit}</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${taxes}</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${line.price_subtotal}</td>
                    </tr>
                `;
            }).join('');

            // Table content
            const contentHtml = orderLines.length > 0
                ? `<table style="width:100%; border-collapse: collapse; margin-top: 5px;">
                        <thead>${tableHeader}</thead>
                        <tbody>${tableRows}</tbody>
                   </table>`
                : `<div style="padding: 8px; text-align: center; font-weight: bold; color: #ff0000;">No Products</div>`;

            // Append after the row
            const infoDiv = `<tr class="pinned-info">
                                <td colspan="100%" style="background: #f0f8ff; padding: 5px;">
                                    ${contentHtml}
                             </td>
                            </tr>`;
            $(row).after(infoDiv);

            // Change icon
            pinIcon.removeClass('fa-caret-right').addClass('fa-caret-down');
        }

        // Optionally, save pinned record (if you have a model for this)
        rpc.query({
            model: "pin.records",
            method: 'save_pin_record',
            args: [[parseInt(record.resId), record.resModel]],
        });
    },

    // Fetch sale order lines with default fields
    async _fetchOrderLines(orderId) {
        return await rpc.query({
            model: 'sale.order.line',
            method: 'search_read',
            args: [[['order_id', '=', orderId]]],
            kwargs: { fields: ['product_id', 'product_uom_qty', 'price_unit', 'tax_id', 'price_subtotal'] },
        });
    },
});
