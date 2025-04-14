import axios from 'axios';

export const fetchAndTransformList = async ({
  url,
  labelKey = 'name',     // The key to be used for label (e.g. colorName, styleName)
  setOptions = null ,             // Function to set the transformed list (e.g. setColorList)
  setFields,              // State updater to update form field options
  fieldName,              // Name of the field in form to be updated
  setIsFormReady = null  , // Optional function to trigger when data is ready
  dataKey = null
}) => {
  try {
    const response = await axios.get(url, { withCredentials: true });
    let dataList = []
    if (dataKey) {
        dataList = response.data?.data?.[dataKey] || [];
      } else {
        dataList = response.data?.data
      }
    console.log(dataList)
    const transformedList = dataList.map(item => ({
      value: item._id,
      label: item[labelKey]
    }));

    // if (setOptions) setOptions(transformedList);

    if (setFields) {
      setFields(prevFields =>
        prevFields.map(field =>
          field.name === fieldName ? { ...field, options: transformedList } : field
        )
      );
    }

    if (setIsFormReady && transformedList.length > 0) {
      setIsFormReady(true);
    }
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
  }
};