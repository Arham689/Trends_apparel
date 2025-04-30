import React, { useEffect, useState } from 'react';
import { data } from '../lib/sideBarOptions.js';
import {
  ChevronDown, ChevronRight, Menu, PanelLeft, X
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

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
    <div className='pl-3 font-light'>
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

          {node?.options && (
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                expandedItems[node.name] ? 'max-h-[1000px]' : 'max-h-0'
              }`}
            >
              <List list={node.options} />
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const toggleButton = document.getElementById('sidebar-toggle');

      if (isOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      { isOpen || <button
        id="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-4 z-50 lg:hidden bg-white p-2 rounded-md "
        aria-label="Toggle sidebar"
      >
        <PanelLeft size={24} />
      </button>}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-full bg-gray-50 border-r justify-between select-none flex flex-col transition-transform duration-300 ease-in-out w-64 md:w-72  ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } lg:relative lg:block`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center border-b">
            <div className="w-8 h-8 rounded-md flex items-center justify-center mr-3">
              <Logo /> 
            </div>
            <div className="font-semibold text-lg">Trends Apparel </div>
            {
              isOpen && <button className='ml-auto' onClick={()=>{setIsOpen(s => !s )}}><X/></button>
            }
          </div>

          {/* List (Content Area) */}
          <div className="flex-1 overflow-y-auto">
            <List list={data} />
          </div>

          {/* Footer */}
          <div className="p-4 text-xs text-gray-500 border-t">
            © 2025 All Rights Reserved by Trends Apparel
          </div>
        </div>
      </div>
          
    </>
  );
};

export default Sidebar;

const Logo = () => {
  return (
    <div>
      <svg width="35" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="M0.00183571 0.3125V7.59485C0.00183571 7.59485 -0.141502 9.88783 2.10473 11.8288L14.5469 23.6837L21.0172 23.6005L19.9794 10.8126L17.5261 7.93369L9.81536 0.3125H0.00183571Z" fill="rgb(118,106,241)"></path>
        <path opacity="0.06" clipRule="evenodd" d="M8.17969 17.7762L13.3027 3.75173L17.589 8.02192L8.17969 17.7762Z" fill="#161616"></path>
        <path opacity="0.06" clipRule="evenodd" d="M8.58203 17.2248L14.8129 5.24231L17.6211 8.05247L8.58203 17.2248Z" fill="#161616"></path>
        <path clipRule="evenodd" d="M8.25781 17.6914L25.1339 0.3125H33.9991V7.62657C33.9991 7.62657 33.8144 10.0645 32.5743 11.3686L21.0179 23.6875H14.5487L8.25781 17.6914Z" fill="rgb(118,106,241)"></path>
      </svg>
    </div>
  );
};