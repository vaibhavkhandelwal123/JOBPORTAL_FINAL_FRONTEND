import { Briefcase, MapPin } from "lucide-react";

const fields=[
    {label:"Job Title",placeholder:"Enter Job Title", options:['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'], leftSection:Briefcase},
    {label:"Company",placeholder:"Enter Company Name", options:['Google', 'Microsoft', 'Meta', 'Netflix', 'Adobe', 'Facebook', 'Amazon', 'Apple', 'Spotify'], leftSection:Briefcase},
    {label:"Location",placeholder:"Enter Job Location", options:['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'],leftSection:MapPin},
    {label:"Issuer",placeholder:"Enter Issuer Name", options:['Coursera', 'edX', 'Udacity', 'LinkedIn Learning', 'Khan Academy', 'Pluralsight', 'Skillshare', 'FutureLearn'], leftSection:Briefcase},
]
export {fields};