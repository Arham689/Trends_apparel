import React, { useEffect, useState } from 'react';
import { data } from '../lib/sideBarOptions.js';
import {
  ChevronDown, ChevronRight
} from 'lucide-react';
import { NavLink , useLocation } from 'react-router-dom';

const List = ({ list }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});
  

  useEffect(() => {
    const currentPath = location.pathname;

    const findActivePath = (nodes) => {
      for (const node of nodes) {
        if (node.path === currentPath) {
          return true;
        }
        
        if (node.options && node.options.length > 0) {
          if (findActivePath(node.options)) {
            setExpandedItems(prev => ({ ...prev, [node.name]: true }));
            return true;
          }
        }
      }
      return false;
    };
    
    findActivePath(list);
  }, [location.pathname, list]);

  const toggleExpand = (nodeName, event) => {
    event.preventDefault(); 
    setExpandedItems(prev => ({ ...prev, [nodeName]: !prev[nodeName] }));
  };

  return (
    <div className='pl-3 font-light '>
      {list.map((node) => (
        <div key={node.id}>
          {node.isDropdown ? (
            
            <div 
              className="p-3 mb-2 hover:bg-slate-200 rounded-md mr-3 animate-fadeIn"
              onClick={(e) => toggleExpand(node.name, e)}
            >
              <div className='flex justify-between cursor-pointer'>
                <span className='pl-1 flex gap-1'>
                  {node?.icon && React.createElement(node.icon)}
                  {node.name}
                </span>
                <span>
                  {expandedItems[node.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </div>
            </div>
          ) : (
            
            <NavLink
              to={node.path || '#'}
              className={({ isActive }) => 
                `p-2 mb-2 block animate-dropdownIn ${isActive ? 'bg-gradient-to-r from-primary to-accent text-white rounded-lg mr-3' : 'hover:bg-slate-200 rounded-md mr-3'}`
              }
            >
              <div className='flex justify-between cursor-pointer'>
                <span className='pl-1 flex gap-1'>
                  {node?.icon && React.createElement(node.icon)}
                  {node.name}
                </span>
              </div>
            </NavLink>
          )}

          
          {expandedItems[node.name] && node?.options && (
            <List list={node.options} />
          )}
        </div>
      ))}
    </div>
  );
};

const Sidebar = () => {
  
  return (
    <div className="max-w-80 h-screen bg-sidebar-default border-r border-sidebar-border  flex flex-col">
      <div className="p-4 flex items-center border-b border-sidebar-border">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mr-3">
          <div className="text-white text-xl font-bold">T</div>
        </div>
        <div className="font-semibold text-lg">Trends Apparel</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <List list={data} />
      </div>

      <div className="p-4 text-xs text-gray-500 border-t border-sidebar-border">
        © 2025 All Rights Reserved by Trends Apparel
      </div>
    </div>
  );
};

export default Sidebar;