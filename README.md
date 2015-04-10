1 Register form field widgets as adapters with component registry
    
    NOTE: This should be done by calling the widget. To override one globally just do it manually
    
2 Generate a simple form (without objects) by looking up adapters

    For each field in schema, generate widget by looking up the adapter
    
    Allow adding options:
    
        - exclude -- all but those excluded
        - include -- only those included
        - useWidgets -- dictionary of interfaces to widgets to use instead of those provided (allows overriding for individual forms)
        
  For manual creation we simply use getAdapter on the field (pass custom params through JSX) possibly

    <FormField field={form.title} [...params] />

  This could be used when auto-generating fields.

3 Handle forms with subforms

4 Handle forms with conditional fields

    Here we want to add animations and cross-fades, but how do we specify this? 
    Perhaps we always use cross-fades.
