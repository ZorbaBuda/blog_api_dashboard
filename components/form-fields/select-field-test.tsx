import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { ICategoryDocument } from '@/lib/models/category';

type SelectFieldProps = {
    name : string,
    categories : ICategoryDocument[]
}

export default function SelectFieldTest({name, categories} : SelectFieldProps) {
    const { control } = useFormContext()
  return (
    <div>
        <Controller
          name={name}
          control={control}
          render={({field}) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
             
              <SelectContent>
                {categories.map((category) => {
                  return (
                    <SelectItem value={category.categoryName} key={category.id}>
                       {category.categoryName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>   
          )}
          />
          </div>
  )
}
                {/* <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
             
              <SelectContent>
                {[10, 11, 12, 13].map((year) => {
                  return (
                    <SelectItem value={year.toString()} key={year}>
                      Year {year}
                    </SelectItem>
                  );
                })}
              </SelectContent> */}
           
  
