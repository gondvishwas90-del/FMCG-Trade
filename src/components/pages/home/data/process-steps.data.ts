import type { Step } from '../types/process.types';

/**
 * Process workflow steps data - Commercial Sourcing & Trade Workflow
 */
export const processSteps: Step[] = [
    {
        id: 1,
        number: "01",
        title: "Submit Commercial Requirements",
        subtitle: "Requirements",
        description: "Specify required FMCG brands, case/pallet volumes, and delivery destination.",
    },
    {
        id: 2,
        number: "02",
        title: "Receive Trade Quotation",
        subtitle: "Quotation",
        description: "Our trade desk reviews inventory availability and issues competitive commercial terms.",
    },
    {
        id: 3,
        number: "03",
        title: "Confirm Supply Agreement",
        subtitle: "Agreement",
        description: "Agree on quantities, proforma invoicing, payment terms, and logistics specifications.",
    },
    {
        id: 4,
        number: "04",
        title: "Coordinate Under-Bond Fulfilment",
        subtitle: "Fulfilment",
        description: "Pallet/container preparation in bonded warehouses with export and compliance documentation.",
    },
    {
        id: 5,
        number: "05",
        title: "Dispatch & Ongoing FMCG Supply",
        subtitle: "Delivery",
        description: "Shipment dispatch, customs handover documents, and sustained repeat trade partnerships.",
    },
];
