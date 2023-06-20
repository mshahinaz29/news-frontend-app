import { useState , useEffect } from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import { setPreferredAuthors } from "../redux/slices/preferenceSlice";
import { useDispatch , useSelector} from 'react-redux';

const InputTag = (props) => {
    const { preferred_authors } = useSelector((state) => state.preference);
    const dispatch = useDispatch();    

    const KeyCodes = {
        comma: 188,
        enter: 13
      };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const [tags, setTags] = useState(props.value);
    
      const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = tag => {
        setTags([...tags, tag]);
      };
    
      const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        setTags(newTags);
      };
    
      const handleTagClick = index => {
        // console.log('The tag at index ' + index + ' was clicked');
      };

      useEffect(() => {
        dispatch(setPreferredAuthors(tags));   
    }, [tags])
    
  return (
    <ReactTags
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="bottom"
        autocomplete
        placeholder='Press enter or comma to add new author'
        classNames={{
            tags: 'tagsClass',
            tagInput: 'mt-2',
            tagInputField: 'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            selected: 'selectedClass',
            tag: 'inline-flex items-center rounded-md bg-purple-50 px-2 py-1 font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 mr-2',
            remove: 'removeClass',
            suggestions: 'suggestionsClass',
            activeSuggestion: 'activeSuggestionClass',
            editTagInput: 'editTagInputClass',
            editTagInputField: 'editTagInputField',
            clearAll: 'clearAllClass',
          }}
    />
  )
}

export default InputTag