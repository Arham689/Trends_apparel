import { BarChart2, Briefcase, Dot, LayoutDashboard ,Package,TableOfContents,UserCog, Users } from "lucide-react";

export const data = [
  {
      "id": -1,
      "name": "Dashboard",
      "isDropdown": false,
      "icon" : LayoutDashboard ,
      "path": "/dashboard", 
      "options": []
  },
  {
    "id": 0,
    "name": "Master",
    "isDropdown": true,
    "icon" : TableOfContents ,
    "options": [
    {
      "id": 1,
      "name": "Organization",
      "isDropdown": true,
      "options": [
        {
          "id": 2,
          "name": "Departments",
          "isDropdown": false,
          "icon" : Dot ,
          "path" : '/department',
          "options": []
        },
        {
          "id": 3,
          "name": "Lines",
          "isDropdown": false,
          "icon" : Dot ,
          "path" : '/line',
          "options": []
        },
        {
          "id": 4,
          "name": "Sections",
          "isDropdown": false,
          "icon" : Dot ,
          "path" : '/section',
          "options": []
        }
      ]
    },
    {
      "id": 5,
      "name": "Design",
      "isDropdown": true,
      "options": [
        {
          "id": 6,
          "name": "TID NO.",
          "isDropdown": false,
          "icon" : Dot ,
          "path" : '/tidno',
          "options": []
        },
        {
          "id": 7,
          "name": "Styles",
          "isDropdown": false,
          "icon" : Dot ,
          "path" : '/style',
          "options": []
        },
        {
          "id": 8,
          "name": "Colors",
          "isDropdown": false,
          "icon" : Dot ,
          "path" : '/color',
          "options": []
        },
        {
          "id": 9,
          "name": "Garment Code",
          "isDropdown": false,
          "icon" : Dot ,
          "path" : '/garment-code',
          "options": []
        },
        {
          "id": 10,
          "name": "Sizes",
          "isDropdown": false,
          "icon" : Dot ,
          "path" : '/size',
          "options": []
        }
      ]
    },
    {
      "id": 11,
      "name": "Production",
      "isDropdown": true,
      "options": [
        
        {
          "id":12,
          "name" : "Operations",
          "isDropdown":false,
          "icon" : Dot , 
          "path" : '/operation',
          "options" : []
        },
        {
          "id":13,
          "name" : "Operation Mapping",
          "isDropdown":false,
          "icon" : Dot , 
          "path" : '/operation-mapping',
          "options" : []
        }
      ]
    },
    {
      "id": 14,
      "name": "Maintenance",
      "isDropdown": true,
      "options": [
        {
          "id":15,
          "name" : "Machines",
          "isDropdown":false,
          "icon" : Dot , 
          "path" : '/machines',
          "options" : []
        },
        {
          "id":16,
          "name" : "Machine Issues",
          "isDropdown":false,
          "icon" : Dot , 
          "path" : '/machine-issues',
          "options" : []
        }
      ]
    }
  ]
},
{
  "id":17,
  "name" : "Workers",
  "isDropdown":false,
  "icon" : Users,
  "path": "/worker",
  "options" : [],
},
{
  "id":18,
  "name" : "Supervisors",
  "isDropdown":false, 
  "icon" : UserCog,
  "path": "/supervisor", 
  "options" : []
},
{
  "id":19,
  "name" : "Bundels",
  "isDropdown":false, 
  "icon" : Briefcase,
  "path" : '/bundel' ,
  "options" : []
},
{
  "id":20,
  "name" : "Tasks",
  "isDropdown":false, 
  "icon" : Package,
  "path" : "/task",
  "options" : []
},
{
  "id":21,
  "name" : "Reports",
  "isDropdown":false, 
  "icon" : BarChart2,
  "path": '/report',
  "options" : []
}

]