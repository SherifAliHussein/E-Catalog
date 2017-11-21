﻿// ------------------------------------------------------------------------------
//  <auto-generated>
//      This code was generated by SpecFlow (http://www.specflow.org/).
//      SpecFlow Version:2.2.0.0
//      SpecFlow Generator Version:2.2.0.0
// 
//      Changes to this file may cause incorrect behavior and will be lost if
//      the code is regenerated.
//  </auto-generated>
// ------------------------------------------------------------------------------
#region Designer generated code
#pragma warning disable
namespace ECatalog.BLL.Test.Admin.AddNewRestaurantType
{
    using TechTalk.SpecFlow;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "2.2.0.0")]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [NUnit.Framework.TestFixtureAttribute()]
    [NUnit.Framework.DescriptionAttribute("Add new restaurant type")]
    public partial class AddNewRestaurantTypeFeature
    {
        
        private TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "AdminAddRestaurantType.feature"
#line hidden
        
        [NUnit.Framework.OneTimeSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Add new restaurant type", "In order to add new restaurant type\r\nAs a admin\r\nI want to add new restaurant typ" +
                    "e", ProgrammingLanguage.CSharp, ((string[])(null)));
            testRunner.OnFeatureStart(featureInfo);
        }
        
        [NUnit.Framework.OneTimeTearDownAttribute()]
        public virtual void FeatureTearDown()
        {
            testRunner.OnFeatureEnd();
            testRunner = null;
        }
        
        [NUnit.Framework.SetUpAttribute()]
        public virtual void TestInitialize()
        {
        }
        
        [NUnit.Framework.TearDownAttribute()]
        public virtual void ScenarioTearDown()
        {
            testRunner.OnScenarioEnd();
        }
        
        public virtual void ScenarioSetup(TechTalk.SpecFlow.ScenarioInfo scenarioInfo)
        {
            testRunner.OnScenarioStart(scenarioInfo);
        }
        
        public virtual void ScenarioCleanup()
        {
            testRunner.CollectScenarioErrors();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Admin add new restaurant type")]
        public virtual void AdminAddNewRestaurantType()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Admin add new restaurant type", ((string[])(null)));
#line 6
this.ScenarioSetup(scenarioInfo);
#line 7
testRunner.Given("I am logged in as a admin to add new restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 8
testRunner.When("I entered restaurant type name", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 9
testRunner.And("I click on add restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 10
testRunner.Then("restaurant type will added successfully", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Admin add new restaurant type without entering name")]
        public virtual void AdminAddNewRestaurantTypeWithoutEnteringName()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Admin add new restaurant type without entering name", ((string[])(null)));
#line 12
this.ScenarioSetup(scenarioInfo);
#line 13
testRunner.Given("I am logged in as a admin to add new restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 14
testRunner.When("I left restaurant type name", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 15
testRunner.And("I click on add restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 16
testRunner.Then("Missing Name validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Admin add new restaurant type with existing name")]
        public virtual void AdminAddNewRestaurantTypeWithExistingName()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Admin add new restaurant type with existing name", ((string[])(null)));
#line 18
this.ScenarioSetup(scenarioInfo);
#line 19
testRunner.Given("I am logged in as a admin to add new restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 20
testRunner.When("I entered existing restaurant type name", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 21
testRunner.And("I click on add restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 22
testRunner.Then("Repeated Name validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Admin add new restaurant type with more than 300 characters")]
        public virtual void AdminAddNewRestaurantTypeWithMoreThan300Characters()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Admin add new restaurant type with more than 300 characters", ((string[])(null)));
#line 25
this.ScenarioSetup(scenarioInfo);
#line 26
testRunner.Given("I am logged in as a admin to add new restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 27
testRunner.When("I entered restaurant type name with more than 300 characters", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 28
testRunner.And("I click on add restaurant type", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 29
testRunner.Then("Maximum length validation message will return", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
