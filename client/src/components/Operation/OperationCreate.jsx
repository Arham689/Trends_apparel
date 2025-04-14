import { useIsAuth } from '@/hooks/useIsAuth';
import React, { useState } from 'react'
import withDynamicForm from '../ui/WithDynamicForm';
import OperationMappingForm from '../ui/WithDynamicForm';
import MappingEditList from '../OperationMapping/MappingEditList';

// const SidebarForm = withDynamicForm({
//   formStyle: 'sidebar',
//   layout: 'vertical',
//   showHeader: true,
//   baseApiUrl: import.meta.env.VITE_BASE_API_URL || ''
// });

// // Create a page form component
// const PageForm = ({
//   formStyle: 'page',
//   layout: 'grid',
//   gridColumns: 4,
//   showHeader: true
// });

const OperationCreate = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [initialValues, setInitialValues] = useState({});
    const formFields = [
    {
        name: 'tid',
        label: 'TID NO.',
        type: 'select',
        required: true,
        options: [
        { value: 'tid1', label: 'TID 001' },
        { value: 'tid2', label: 'TID 002' },
        { value: 'tid3', label: 'TID 003' }
        ]
    },
    {
        name: 'style',
        label: 'Style',
        type: 'select',
        required: true,
        options: [
        { value: 'casual', label: 'Casual' },
        { value: 'formal', label: 'Formal' },
        { value: 'sportswear', label: 'Sportswear' }
        ]
    },
    {
        name: 'garment',
        label: 'Garment',
        type: 'select',
        required: true,
        options: [
        { value: 'shirt', label: 'Shirt' },
        { value: 'pants', label: 'Pants' },
        { value: 'jacket', label: 'Jacket' }
        ]
    },
    {
        name: 'operations',
        label: 'Operations',
        type: 'select',
        required: true,
        options: [
        { value: 'cutting', label: 'Cutting' },
        { value: 'sewing', label: 'Sewing' },
        { value: 'finishing', label: 'Finishing' }
        ]
    }
    ];

    const handleSubmitSuccess = (data) => {
    console.log('Form submitted successfully:', data);
    // Refresh your data or perform other actions
    };

    const handleEditItem = (item) => {
    setInitialValues(item);
    setIsEditMode(true);
    setEditItemId(item.id);
    setIsFormOpen(true);
    };

    const handleAddNew = () => {
    setInitialValues({});
    setIsEditMode(false);
    setEditItemId(null);
    setIsFormOpen(true);
    };
    
    useIsAuth()
    return (
        <div>
            
            <div className="container mx-auto p-4">
            <OperationMappingForm
                title="Operation Mapping"
                fields={formFields}
                endpoint="/mapping"
                onSubmitSuccess={handleSubmitSuccess}
                initialValues={initialValues}
                isEditing={isEditMode}
                itemId={editItemId}
                setIsOpen={() => window.history.back()} // Example for going back
                submitButtonText={isEditMode ? "Update Mapping" : "Create Mapping"}
                cancelButtonText="Go Back"
            />
            </div>

        </div>
    )
}

export default OperationCreate
